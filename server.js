app.get('/search', (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.redirect('/');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Matel Search - ${query}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
        body { background-color: #0b0f14; color: #ffffff; display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 30px 20px; }
        .container { width: 100%; max-width: 700px; }
        h2 { color: #00ffcc; margin-bottom: 15px; font-size: 24px; }
        p { color: #8b9bb0; font-size: 14px; margin-bottom: 25px; }
        .back-btn { display: inline-block; background-color: #12181f; border: 1px solid #1a232e; color: #00ffcc; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: bold; }
        .back-btn:hover { border-color: #00ffcc; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Matel Search Results</h2>
        <p>You searched for: <strong style="color: #ffffff;">${query}</strong></p>
        <a href="/" class="back-btn">← Back to Home</a>
      </div>
    </body>
    </html>
  `);
});
