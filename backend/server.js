const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

dotenv.config();

// MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

const dbName = process.env.DB_NAME;
const app = express();

// Use Render's port or fallback to 3000 for local dev
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// -------------------- API ROUTES (must come first) --------------------
app.get('/api/passwords', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/passwords', async (req, res) => {
  try {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/passwords', async (req, res) => {
  try {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- SERVE REACT FRONTEND (if built) --------------------
// Assuming the build folder is at the project root (one level up from 'backend')
const buildPath = path.join(__dirname, '..', 'build');

if (fs.existsSync(buildPath)) {
  // Serve static files (JS, CSS, images) from the build folder
  app.use(express.static(buildPath));

  // ✅ Catch‑all: any request that isn't an API call → serve index.html
  // This middleware runs after all other routes, so it won't interfere with API calls.
  app.use((req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // Fallback if build folder is missing
  app.get('/', (req, res) => {
    res.send('Frontend not built yet. Run "npm run build" from the project root.');
  });
  app.use((req, res) => {
    res.status(404).send('Not found');
  });
}

// -------------------- START SERVER --------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});