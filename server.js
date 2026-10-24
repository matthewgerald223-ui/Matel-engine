const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function evaluateMath(query) {
    if (/^[0-9+\-*/. ()]+$/.test(query) && /[+\-*/]/.test(query)) {
        try {
            const result = eval(query);
            return `${query} = ${result}`;
        } catch (e) {
            return null;
        }
    }
    return null;
}

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const instantMath = evaluateMath(query);
    if (instantMath) {
        return res.json({
            type: 'instant',
            answer: instantMath,
            results: []
        });
    }

    try {
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
        
        const response = await fetch(wikiUrl);
        const data = await response.json();

        let searchResults = [];

        if (data.query && data.query.search) {
            searchResults = data.query.search.map(item => ({
                title: item.title,
                snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
                url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
            }));
        }

        return res.json({
            type: 'web',
            query: query,
            results: searchResults
        });

    } catch (error) {
        console.error('Backend search error:', error);
        return res.status(500).json({ error: 'Failed to process search request.' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Matel engine running live on port ${PORT}`);
});
