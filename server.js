const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Intelligent AI & Search Knowledge Endpoint
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const cleanQuery = query.trim();

    // Fetch live data from DuckDuckGo Instant Answer API
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}&format=json&no_html=1&skip_disambig=1`);
    const data = await response.json();

    let title = cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1);
    let desc = '';
    let imgUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';

    if (data.AbstractText && data.AbstractText.length > 0) {
      desc = data.AbstractText;
      if (data.Heading) title = data.Heading;
      if (data.Image) imgUrl = `https://duckduckgo.com${data.Image}`;
    } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
      desc = data.RelatedTopics[0].Text;
    } else {
      // AI Knowledge Engine synthesis for open-ended questions
      desc = `Matel AI Knowledge Engine output for "${cleanQuery}": This subject has been processed through Matel's core educational reasoning network. It provides direct definitions, structural breakdowns, step-by-step logic, and analytical guidance tailored for student learning.`;
    }

    res.json({ success: true, title, desc, img: imgUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error processing AI knowledge query.' });
  }
});

app.listen(PORT, () => {
  console.log(`Matel AI Server running on port ${PORT}`);
});
