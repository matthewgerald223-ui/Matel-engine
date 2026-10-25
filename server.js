const express = require('express');
const app = express();

// Serve static files from public folder if needed
app.use(express.static('public'));

// Search Route
app.get('/search', (req, res) => {
  const query = req.query.q; // Grabs what you typed inside the search bar
  
  if (!query) {
    return res.redirect('/');
  }

  // For now, let's make it display what you searched for
  res.send(`
    <html>
      <head>
        <title>Matel Search: ${query}</title>
        <style>
          body { background: #0b0f14; color: #fff; font-family: sans-serif; padding: 40px; text-align: center; }
          h2 { color: #00ffcc; }
          a { color: #00ffcc; text-decoration: none; display: inline-block; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h2>Matel Search Results</h2>
        <p>You searched for: <strong>${query}</strong></p>
        <a href="/">← Back to Home</a>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Matel engine running on port ${PORT}`);
});
