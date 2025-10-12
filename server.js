const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
