const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Server-Side Live Search Feed Route
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const cleanQuery = query.toLowerCase()
      .replace(/define\s+|what is\s+|who is\s+|tell me about\s+|how to\s+/g, '')
      .trim();

    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}&format=json&no_html=1&skip_disambig=1`);
    const data = await response.json();

    let title = query.charAt(0).toUpperCase() + query.slice(1);
    let desc = '';
    let imgUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';

    if (data.AbstractText && data.AbstractText.length > 0) {
      desc = data.AbstractText;
      if (data.Heading) title = data.Heading;
      if (data.Image) imgUrl = `https://duckduckgo.com${data.Image}`;
    } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
      desc = data.RelatedTopics[0].Text;
    } else {
      desc = `Matel Live Feed: Real-time record synthesized for "${cleanQuery}".`;
    }

    res.json({ success: true, title, desc, img: imgUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error fetching live feed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
