const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dummy user data (in a real system, you would use a database)
const users = {
  'zap@example.com': 'secure123',
  'bob_user': 'strong123',
};

// Authentication function
function authenticate(username, password) {
  return users[username] && users[username] === password;
}

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const { username, password } = req.body;

  if (authenticate(username, password)) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Protected route
app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'You have access to this protected resource!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
