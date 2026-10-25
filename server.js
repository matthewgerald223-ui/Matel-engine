const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve frontend static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Basic API test route
app.get('/api/status', (req, res) => {
  res.json({ status: 'Matel server dey run smoothly!', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Matel server active on port ${PORT}`);
});
