const express = require('express');
const path = require('path');
const app = express();

// Serve all static files (index.html, CSS, etc.) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Explicit search route to serve search.html when form is submitted
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// Fallback home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Matel engine running on port ${PORT}`);
});
