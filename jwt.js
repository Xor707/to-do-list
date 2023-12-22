const jwt = require('jsonwebtoken');

// Create a JWT
const payload = { user_id: 123, username: 'alice' };
const secretKey = '1234567890';

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('Generated Token:', token);

// Verify a JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Verification Failed:', err.message);
  } else {
    console.log('Decoded Token:', decoded);
  }
});
