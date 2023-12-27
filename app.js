// app.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();

// Access environment variables
const port = process.env.PORT || 8000;
const apiKey = process.env.API_KEY;
const debugMode = process.env.DEBUG === 'true';

// Define a simple route
app.get('/', (req, res) => {
  res.send(`Hello, this is my Node.js app! API Key: ${1234567890}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  if (debugMode) {
    console.log('Debug mode is enabled');
  }
});
