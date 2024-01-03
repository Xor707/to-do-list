// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

// Load user data from the JSON file
let users = require('./users.json');

// User registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  if (users[username]) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Store user data in the JSON file
  users[username] = hashedPassword;
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists
  if (!users[username]) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  // Compare the password
  if (bcrypt.compareSync(password, users[username])) {
    // Generate a JWT token upon successful authentication
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Protected route
app.get('/protected', (req, res) => {
  // Middleware can be used to check the JWT token before reaching this point
  res.json({ message: 'You have access to this protected resource!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
