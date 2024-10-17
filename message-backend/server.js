const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the public directory

// Serve index.html on root access
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Endpoint to receive messages
app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;

    const msg = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nDate: ${new Date().toLocaleString()}\n\n`;

    // Append message to messages.txt file
    fs.appendFile('messages.txt', msg, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Message saved successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
