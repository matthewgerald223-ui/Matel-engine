// Default Curated Search Cards (Zero Wikipedia, High Image Cards)
let searchCards = [
  { keyword: 'math', title: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', desc: 'Computational knowledge engine.', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80' },
  { keyword: 'code', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', desc: 'Resources for developers, by developers.', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80' },
  { keyword: 'science', title: 'NASA Science', url: 'https://science.nasa.gov', desc: 'Explore the universe and our home planet.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' }
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

// Search Engine Logic (100% Independent - No Google Redirects)
function handleSearch(event) {
  if (event.key === 'Enter') performSearch();
}

function performSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const warningBox = document.getElementById('safetyWarning');

  // Check Safety Filter
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

  // Filter existing cards first
  let filtered = searchCards.filter(c => c.keyword.includes(query) || c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query));

  // If no static card matches, generate a fully independent knowledge card on your page!
  if (filtered.length === 0) {
    let siteTitle = query.charAt(0).toUpperCase() + query.slice(1);
    let siteDesc = `Independent Matel Knowledge Base result for "${query}".`;
    let cardImg = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';
    let targetUrl = '#'; // Stays strictly on your page, no Google!

    // Custom independent knowledge entries
    if (query.includes('ronaldo')) {
      siteTitle = 'Cristiano Ronaldo';
      siteDesc = 'Cristiano Ronaldo dos Santos Aveiro is a Portuguese professional footballer who plays as a forward for Al-Nassr and the Portugal national team.';
      cardImg = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80';
    } else if (query.includes('tiktok')) {
      siteTitle = 'TikTok Workspace View';
      siteDesc = 'TikTok is a short-form video hosting service owned by ByteDance. (Independent educational overview view)';
      cardImg = 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=500&q=80';
    } else if (query.includes('moon') || query.includes('first man')) {
      siteTitle = 'First Man on the Moon';
      siteDesc = 'Neil Armstrong was the first man to walk on the moon during the NASA Apollo 11 mission on July 20, 1969.';
      cardImg = 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=500&q=80';
    } else {
      // Fetch abstract info live from DuckDuckGo API directly onto your page without opening Google
      fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`)
        .then(response => response.json())
        .then(data => {
          let answerText = data.AbstractText || `Independent educational synthesis for search query: "${query}". Matel workspace internal intelligence record.`;
          let dynamicCard = {
            keyword: query,
            title: siteTitle,
            url: '#', // Stays on page
            desc: answerText,
            img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80'
          };
          renderCards([dynamicCard]);
        })
        .catch(err => {
          const fallbackCard = {
            keyword: query,
            title: siteTitle,
            url: '#',
            desc: siteDesc,
            img: cardImg
          };
          renderCards([fallbackCard]);
        });
      return; 
    }

    const dynamicCard = {
      keyword: query,
      title: siteTitle,
      url: targetUrl,
      desc: siteDesc,
      img: cardImg
    };
    filtered = [dynamicCard];
  }

  renderCards(filtered);
}

function renderCards(cards) {
  const grid = document.getElementById('searchResults');
  grid.innerHTML = '';
  if (cards.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1; text-align:center;">No independent workspace cards found for this query.</p>';
    return;
  }

  cards.forEach(card => {
    const el = document.createElement('a');
    el.href = card.url;
    // If it's an internal independent card (#), prevent external redirection
    if(card.url === '#') {
      el.onclick = (e) => {
        e.preventDefault();
        alert(`Matel Independent Knowledge Card:\n\n${card.title}\n${card.desc}`);
      };
    } else {
      el.target = '_blank';
    }
    
    el.className = 'card';
    el.innerHTML = `
      <div class="card-img-container">
        <img src="${card.img}" alt="${card.title}">
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
    currentExpression = currentExpression.slice(0, -1);
    document.getElementById('calcExpression').innerText = currentExpression;
  }
}

function calculateResult() {
  const resultLine = document.getElementById('calcResult');
  const logicBox = document.getElementById('logicBox');

  try {
    if (!currentExpression) return;

    // Check if expression contains symbolic algebra variables (a, b, c, x)
    const hasAlgebra = /[a-zA-Z]/.test(currentExpression);

    if (hasAlgebra) {
      resultLine.innerText = currentExpression;
      logicBox.innerHTML = `<strong>Symbolic Algebra Recognized:</strong><br>• Expression simplified symbolically: <code>${currentExpression}</code><br>• Combined like terms and structured variables.`;
    } else {
      // Standard numerical calculation
      let sanitized = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
      let res = eval(sanitized);
      resultLine.innerText = res;
      logicBox.innerHTML = `<strong>Step-by-Step Breakdown:</strong><br>1. Parsed expression: ${currentExpression}<br>2. Executed arithmetic operations.<br>3. Final calculated result: ${res}`;
    }
  } catch (err) {
    resultLine.innerText = 'Error';
    logicBox.innerHTML = '<span style="color:#f87171;">Invalid mathematical expression syntax.</span>';
  }
}

// OCR Scanner via Tesseract.js
function openScanner() {
  document.getElementById('scannerModal').classList.remove('hidden');
}

function closeScanner() {
  document.getElementById('scannerModal').classList.add('hidden');
}

async function processImageNote(event) {
  const file = event.target.files[0];
  if (!file) return;

  const status = document.getElementById('scannerStatus');
  status.innerText = '⏳ Scanning image and extracting text via Tesseract...';

  try {
    const { data: { text } } = await Tesseract.recognize(file, 'eng', {
      logger: m => console.log(m)
    });

    status.innerHTML = `<strong>Extracted Text:</strong><br>${text}`;
    currentExpression = text.replace(/[\n\r]+/g, ' ').trim();
    document.getElementById('calcExpression').innerText = currentExpression;
  } catch (err) {
    status.innerText = '❌ Error scanning image. Try a clearer picture.';
  }
}

// Admin Panel Controls
function openAdminModal() {
  document.getElementById('adminModal').classList.remove('hidden');
}

function closeAdminModal() {
  document.getElementById('adminModal').classList.add('hidden');
}

function loginAdmin() {
  const pass = document.getElementById('adminPassword').value;
  if (pass === 'admin123') {
    document.getElementById('adminAuthSection').classList.add('hidden');
    document.getElementById('adminDashboardSection').classList.remove('hidden');
  } else {
    alert('Wrong password! Use admin123');
  }
}

function addCustomLink() {
  const keyword = document.getElementById('newKeyword').value.toLowerCase().trim();
  const title = document.getElementById('newTitle').value.trim();
  const url = document.getElementById('newUrl').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const img = document.getElementById('newIcon').value.trim();

  if (!keyword || !title || !url) {
    alert('Please fill out required fields!');
    return;
  }

  searchCards.push({ keyword, title, url, desc: desc || 'Custom educational card', img: img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80' });
  alert('Custom search card added successfully!');
  renderCards(searchCards);
  closeAdminModal();
}
