const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

const secretKey = '1234567890';

// Endpoint for generating and verifying a JWT
app.get('/generateToken', (req, res) => {
  // Generate a JWT
  const payload = { user_id: 123, username: 'alice' };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  console.log('Generated Token:', token);

  // Send the generated token as a response
  res.json({ token });
});

// Endpoint for verifying and decoding a JWT
app.get('/verifyToken/:token', (req, res) => {
  const token = req.params.token;

  // Verify and decode the JWT
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Verification Failed:', err.message);
      res.status(401).json({ error: 'Verification Failed' });
    } else {
      console.log('Decoded Token:', decoded);
      res.json({ decoded });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
