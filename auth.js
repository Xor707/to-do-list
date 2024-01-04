const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const users = {
  'zap@example.com': 'secure123',
  'bob_user': 'strong123',
};


function authenticate(username, password) {
  return users[username] && users[username] === password;
}


function isAuthenticated(req, res, next) {
  const { username, password } = req.body;

  if (authenticate(username, password)) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}


app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'You have access to this protected resource!' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
