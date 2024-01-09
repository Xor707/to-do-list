const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
  res.send('Hello, vercel!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
