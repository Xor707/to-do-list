const express = require('express');
const app = express();

const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, this is your local server!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
