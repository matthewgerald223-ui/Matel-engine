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

// Popular shortcuts dictionary
const popularSites = {
    'tiktok': 'https://www.tiktok.com',
    'youtube': 'https://www.youtube.com',
    'facebook': 'https://www.facebook.com',
    'instagram': 'https://www.instagram.com',
    'twitter': 'https://x.com',
    'x': 'https://x.com',
    'google': 'https://www.google.com',
    'github': 'https://github.com',
    'whatsapp': 'https://web.whatsapp.com',
    'reddit': 'https://www.reddit.com'
};

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const cleanQuery = query.trim().toLowerCase();

    // 1. Math calculation check
    const instantMath = evaluateMath(query);
    if (instantMath) {
        return res.json({
            type: 'instant',
            answer: instantMath,
            results: []
        });
    }

    let searchResults = [];

    // 2. Direct Website Shortcut check
    if (popularSites[cleanQuery]) {
        searchResults.push({
            title: `Visit ${cleanQuery.toUpperCase()} Official Website`,
            snippet: `Direct link to open and watch/use ${cleanQuery} live on their official platform.`,
            url: popularSites[cleanQuery]
        });
    } else if (cleanQuery.includes('.') && !cleanQuery.includes(' ')) {
        const directUrl = cleanQuery.startsWith('http') ? cleanQuery : `https://${cleanQuery}`;
        searchResults.push({
            title: `Go directly to ${cleanQuery}`,
            snippet: `Direct web address match for ${cleanQuery}.`,
            url: directUrl
        });
    }

    // 3. Fetch Wikipedia information results
    try {
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
        
        const response = await fetch(wikiUrl);
        const data = await response.json();

        if (data.query && data.query.search) {
            const wikiResults = data.query.search.map(item => ({
                title: item.title,
                snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
                url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
            }));
            searchResults = searchResults.concat(wikiResults);
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
