const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(cors());

// -------------------- MongoDB Connection --------------------
const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

// -------------------- API ROUTES --------------------
app.get('/api/passwords', async (req, res) => {
  try {
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
    const collection = db.collection('passwords');
    const result = await collection.insertOne(password);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/passwords', async (req, res) => {
  try {
    const filter = req.body; // expects { id: "..." } or { _id: ... }
    const collection = db.collection('passwords');
    const result = await collection.deleteOne(filter);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- Serve React Frontend --------------------
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Frontend not built yet. Run "npm run build" from the project root.');
  });
  app.use((req, res) => {
    res.status(404).send('Not found');
  });
}

// -------------------- Start Server AFTER DB connection --------------------
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});