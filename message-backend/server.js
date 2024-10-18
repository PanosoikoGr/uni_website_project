const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy login credentials (for simplicity, hardcoded)
const username = 'admin';
const password = 'password123';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the public directory

// Serve index.html on root access
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Login route
app.post('/login', (req, res) => {
    const { username: user, password: pass } = req.body;

    // Check credentials
    if (user === username && pass === password) {
        // Set a cookie named 'auth' to true if the credentials are correct
        res.cookie('auth', true, { httpOnly: true });
        return res.status(200).send('Login successful');
    } else {
        return res.status(401).send('Invalid credentials');
    }
});

// Logout route
app.post('/logout', (req, res) => {
    // Clear the 'auth' cookie
    res.clearCookie('auth');
    return res.status(200).send('Logout successful');
});

// Middleware to protect the messages.html page
app.get('/messages.html', (req, res) => {
    // Check if the 'auth' cookie exists and is true
    if (req.cookies.auth) {
        // If authenticated, serve the messages.html file from the private folder
        res.sendFile(path.join(__dirname, '../private', 'messages.html'));
    } else {
        // If not authenticated, redirect to the homepage
        res.redirect('/');
    }
});

// Endpoint to get all messages (remains unchanged)
app.get('/api/messages', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json({ messages: data });
    });
});

// Endpoint to receive messages (remains unchanged)
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
