// index.js

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4000;
const secretKey = '1234567890';

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Attach decoded user information to the request object
    req.user = decoded;
    next();
  });
};

// Route for generating a token (authentication)
app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'exampleUser',
  };

  // Create a token with user information
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Protected route that requires a valid token for access
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
