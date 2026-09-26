import React, { useState } from 'react'

const PasswordGenerator = ({ onUse }) => {
    const [length, setLength] = useState(16)
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    })
    const [generated, setGenerated] = useState('')

    const generate = () => {
        let chars = ''
        if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
        if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (options.numbers) chars += '0123456789'
        if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

        if (!chars) return

        const array = new Uint32Array(length)
        crypto.getRandomValues(array)
        const password = Array.from(array, (n) => chars[n % chars.length]).join('')
        setGenerated(password)
    }

    const toggle = (key) => {
        setOptions({ ...options, [key]: !options[key] })
    }

    return (
        <div className="w-full bg-white border border-green-300 rounded-lg p-4 mt-2">
            <h3 className="font-bold text-lg mb-3">Generate Password</h3>

            <div className="flex items-center gap-3 mb-3">
                <label className="text-sm font-medium">Length: {length}</label>
                <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="flex-grow accent-green-600"
                />
            </div>

            <div className="flex flex-wrap gap-3 mb-3">
                {Object.entries(options).map(([key, val]) => (
                    <label key={key} className="flex items-center gap-1 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            checked={val}
                            onChange={() => toggle(key)}
                            className="accent-green-600"
                        />
                        {key}
                    </label>
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={generate}
                    className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-500 text-sm"
                >
                    Generate
                </button>
            </div>

            {generated && (
                <div className="mt-3 flex items-center gap-2">
                    <code className="bg-gray-100 p-2 rounded text-sm flex-grow break-all">{generated}</code>
                    <button
                        onClick={() => onUse(generated)}
                        className="bg-green-700 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap hover:bg-green-600"
                    >
                        Use
                    </button>
                </div>
            )}
        </div>
    )
}

export default PasswordGenerator