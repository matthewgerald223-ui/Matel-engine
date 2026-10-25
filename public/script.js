// Default Curated Search Cards
let searchCards = [
  { 
    keyword: 'math', 
    title: 'Wolfram Alpha', 
    url: 'https://www.wolframalpha.com', 
    desc: 'Computational knowledge engine for solving advanced mathematics, calculus, algebra, and statistics step-by-step.', 
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    keyword: 'code', 
    title: 'MDN Web Docs', 
    url: 'https://developer.mozilla.org', 
    desc: 'Comprehensive web development resources, documentation for HTML, CSS, JavaScript, and modern web APIs built by developers for developers.', 
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    keyword: 'science', 
    title: 'NASA Science', 
    url: 'https://science.nasa.gov', 
    desc: 'Explore deep space, our home planet, astrophysics missions, planetary science discoveries, and astronomical research reports.', 
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' 
  }
];

// Safety Filter Forbidden Words
const forbiddenWords = ['adult', 'nsfw', 'xxx', 'sex', 'porn'];

// Initialize Page
window.onload = function() {
  renderCards(searchCards);
};

// Toggle Calculator / Search Modes
function toggleMode() {
  const searchSec = document.getElementById('searchSection');
  const calcSec = document.getElementById('calcSection');
  const btn = document.getElementById('modeToggleBtn');

  if (searchSec.classList.contains('hidden')) {
    searchSec.classList.remove('hidden');
    calcSec.classList.add('hidden');
    btn.innerText = 'Switch to Calculator Mode';
  } else {
    searchSec.classList.add('hidden');
    calcSec.classList.remove('hidden');
    btn.innerText = 'Switch to Search Mode';
  }
}

// Search Engine Logic (100% Independent Full-Detail Engine)
function handleSearch(event) {
  if (event.key === 'Enter') performSearch();
}

function performSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const warningBox = document.getElementById('safetyWarning');

  // Safety Check
  const isForbidden = forbiddenWords.some(word => query.includes(word));
  if (isForbidden) {
    warningBox.classList.remove('hidden');
    renderCards([]);
    return;
  } else {
    warningBox.classList.add('hidden');
  }

  if (!query) {
    renderCards(searchCards);
    return;
  }

  // Check static app shortcuts first
  if (query.includes('tiktok')) {
    renderCards([{
      title: 'TikTok Workspace Portal',
      url: 'https://www.tiktok.com',
      desc: 'TikTok is a global short-form video hosting service owned by ByteDance Ltd. It enables creators to produce dancing, comedy, educational, and entertainment videos with built-in editing effects, trending audio tracks, and interactive live streaming features.',
      img: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=500&q=80'
    }]);
    return;
  }

  if (query.includes('youtube')) {
    renderCards([{
      title: 'YouTube Streaming Center',
      url: 'https://www.youtube.com',
      desc: 'YouTube is an online video sharing and social media platform operated by Google. It hosts millions of educational tutorials, music videos, documentaries, vlogs, and live broadcasts accessible worldwide.',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'
    }]);
    return;
  }

  // Filter existing static cards
  let filtered = searchCards.filter(c => c.keyword.includes(query) || c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query));

  if (filtered.length > 0) {
    renderCards(filtered);
    return;
  }

  // Detailed custom built-in knowledge database with full information blocks
  let customTitle = query.charAt(0).toUpperCase() + query.slice(1);
  let customDesc = `Detailed Matel Workspace Record for "${query}": This subject encompasses extensive background data, core principles, historical relevance, and advanced applications structured specifically for high-performance educational analysis.`;
  let customImg = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';

  if (query.includes('ronaldo')) {
    customTitle = 'Cristiano Ronaldo (Full Profile)';
    customDesc = 'Cristiano Ronaldo dos Santos Aveiro (born 5 February 1985) is a Portuguese professional footballer who plays as a forward and captains both the Saudi Professional League club Al-Nassr and the Portugal national team. Widely regarded as one of the greatest players of all time, Ronaldo has won five Ballon d\'Or awards, three UEFA Best Player in Europe Awards, and four European Golden Shoes. He has scored over 900 official senior career goals for club and country, making him the top goalscorer of all time.';
    customImg = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80';
  } else if (query.includes('moon') || query.includes('first man')) {
    customTitle = 'Apollo 11 & First Man on the Moon';
    customDesc = 'American astronaut Neil Armstrong became the first person to walk on the Moon on July 20, 1969, at 02:56 UTC, during the Apollo 11 mission. Commander Armstrong famously stepped onto the lunar surface and stated: "That\'s one small step for man, one giant leap for mankind." He was accompanied on the historic mission by Lunar Module Pilot Buzz Aldrin and Command Module Pilot Michael Collins.';
    customImg = 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=500&q=80';
  } else if (query.includes('python')) {
    customTitle = 'Python Programming Language';
    customDesc = 'Python is a high-level, interpreted, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python\'s design philosophy emphasizes code readability with the use of significant indentation. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects including web applications, data science, artificial intelligence, and task automation.';
    customImg = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80';
  }

  renderCards([{
    title: customTitle,
    desc: customDesc,
    img: customImg,
    url: '#'
  }]);
}

function renderCards(cards) {
  const grid = document.getElementById('searchResults');
  grid.innerHTML = '';
  if (cards.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1; text-align:center;">No workspace cards found.</p>';
    return;
  }

  cards.forEach(card => {
    const el = document.createElement('a');
    el.href = card.url || '#';
    
    if (card.url === '#') {
      el.onclick = (e) => {
        e.preventDefault();
        alert(`${card.title.toUpperCase()}\n\n${card.desc}`);
      };
    } else {
      el.target = '_blank';
    }
    
    el.className = 'card';
    el.innerHTML = `
      <div class="card-img-container">
        <img src="${card.img}" alt="${card.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';">
      </div>
      <div class="card-content">
        <h4>${card.title}</h4>
        <p>${card.desc}</p>
      </div>
    `;
    grid.appendChild(el);
  });
}

// Calculator Logic with Symbolic Algebra & Step-by-Step Breakdown
let currentExpression = '';

function calcInput(val) {
  currentExpression += val;
  document.getElementById('calcExpression').innerText = currentExpression;
}

function calcAction(action) {
  if (action === 'AC' || action === 'C') {
    currentExpression = '';
    document.getElementById('calcExpression').innerText = '';
    document.getElementById('calcResult').innerText = '0';
    document.getElementById('logicBox').innerHTML = '<p><em>Step-by-step breakdown will appear here...</em></p>';
  } else if (action === 'DEL') {
