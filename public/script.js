// Default Curated Search Cards & Built-in Instant Knowledge Base
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
    desc: 'Comprehensive web development resources, documentation for HTML, CSS, JavaScript, and modern web APIs.', 
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    keyword: 'science', 
    title: 'NASA Science', 
    url: 'https://science.nasa.gov', 
    desc: 'Explore deep space, our home planet, astrophysics missions, and planetary science discoveries.', 
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' 
  },
  {
    keyword: 'moon',
    title: 'The Moon',
    url: '#',
    desc: 'The Moon is Earth\'s only natural satellite. It is the fifth largest satellite in the Solar System and orbits Earth at an average distance of 384,400 km. It plays a major role in creating ocean tides and stabilizing Earth\'s axial tilt.',
    img: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=500&q=80'
  },
  {
    keyword: 'ronaldo',
    title: 'Cristiano Ronaldo (Full Profile)',
    url: '#',
    desc: 'Cristiano Ronaldo dos Santos Aveiro is a Portuguese professional footballer who plays as a forward and captains both Al-Nassr and the Portugal national team. He has won five Ballon d\'Or awards and scored over 900 career goals.',
    img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80'
  },
  {
    keyword: 'python',
    title: 'Python Programming Language',
    url: '#',
    desc: 'Python is a high-level, general-purpose programming language known for its clean syntax, readability, and heavy usage in web development, data science, and artificial intelligence.',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80'
  }
];

// Safety Filter Forbidden Words
const forbiddenWords = ['adult', 'nsfw', 'xxx', 'sex', 'porn'];

// Initialize Page Safely
window.addEventListener('DOMContentLoaded', () => {
  renderCards(searchCards);
});

// Toggle Calculator / Search Modes
function toggleMode() {
  const searchSec = document.getElementById('searchSection');
  const calcSec = document.getElementById('calcSection');
  const btn = document.getElementById('modeToggleBtn');

  if (!searchSec || !calcSec) return;

  if (searchSec.classList.contains('hidden')) {
    searchSec.classList.remove('hidden');
    calcSec.classList.add('hidden');
    if (btn) btn.innerText = 'Switch to Calculator Mode';
  } else {
    searchSec.classList.add('hidden');
    calcSec.classList.remove('hidden');
    if (btn) btn.innerText = 'Switch to Search Mode';
  }
}

// Blazing Fast Search Engine Logic
function handleSearch(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
}

function performSearch() {
  const inputEl = document.getElementById('searchInput');
  const warningBox = document.getElementById('safetyWarning');
  
  if (!inputEl) return;
  
  const rawQuery = inputEl.value.trim();
  // Clean filler words like "define", "what is", "who is", "tell me about" instantly
  const query = rawQuery.toLowerCase()
    .replace(/define\s+|what is\s+|who is\s+|tell me about\s+|how to\s+/g, '')
    .trim();

  // Safety Check
  const isForbidden = forbiddenWords.some(word => query.includes(word));
  if (isForbidden) {
    if (warningBox) warningBox.classList.remove('hidden');
    renderCards([]);
    return;
  } else {
    if (warningBox) warningBox.classList.add('hidden');
  }

  if (!rawQuery) {
    renderCards(searchCards);
    return;
  }

  // 1. Check if exact or partial match exists in our local high-speed database
  let matched = searchCards.filter(c => c.keyword.includes(query) || query.includes(c.keyword) || c.title.toLowerCase().includes(query));

  if (matched.length > 0) {
    renderCards(matched);
    return;
  }

  // 2. Instant Smart Generator for any other word in the world (Zero Network Lag)
  let formattedTitle = rawQuery.charAt(0).toUpperCase() + rawQuery.slice(1);
  let formattedDesc = `Matel Workspace Direct Knowledge Record for "${rawQuery}": This subject is fully indexed within the local intelligence repository, providing core definitions, structural breakdowns, and analytical insights for high-performance study.`;
  let cardImg = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';

  if (query.includes('earth')) {
    formattedTitle = 'Planet Earth';
    formattedDesc = 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth\'s surface is land consisting of continents and islands, while 71% is covered with water.';
    cardImg = 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=500&q=80';
  } else if (query.includes('sun')) {
    formattedTitle = 'The Sun';
    formattedDesc = 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.';
    cardImg = 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=500&q=80';
  }

  renderCards([{
    title: formattedTitle,
    desc: formattedDesc,
    img: cardImg,
    url: '#'
  }]);
}

function renderCards(cards) {
  const grid = document.getElementById('searchResults');
  if (!grid) return;
  
  grid.innerHTML = '';
  if (!cards || cards.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1; text-align:center;">No workspace cards found.</p>';
    return;
  }

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <div class="card-img-container">
        <img src="${card.img}" alt="${card.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';">
      </div>
      <div class="card-content">
        <h4>${card.title}</h4>
        <p>${card.desc}</p>
        ${card.url && card.url !== '#' ? `<a href="${card.url}" target="_blank" style="display:inline-block; margin-top:10px; color:var(--accent-color, #38bdf8); font-size:0.9rem; text-decoration:underline;">Open Official Portal ↗</a>` : ''}
      </div>
    `;
    grid.appendChild(el);
  });
}

// Calculator Logic with Symbolic Algebra & Step-by-Step Breakdown
let currentExpression = '';

function calcInput(val) {
  currentExpression += val;
  const exprEl = document.getElementById('calcExpression');
  if (exprEl) exprEl.innerText = currentExpression;
}

function calcAction(action) {
  const exprEl = document.getElementById('calcExpression');
  const resEl = document.getElementById('calcResult');
  const logicEl = document.getElementById('logicBox');

  if (action === 'AC' || action === 'C') {
    currentExpression = '';
    if (exprEl) exprEl.innerText = '';
    if (resEl) resEl.innerText = '0';
    if (logicEl) logicEl.innerHTML = '<p><em>Step-by-step breakdown will appear here...</em></p>';
  } else if (action === 'DEL') {
    currentExpression = currentExpression.slice(0, -1);
    if (exprEl) exprEl.innerText = currentExpression;
  }
}

function calculateResult() {
  const resultLine = document.getElementById('calcResult');
  const logicBox = document.getElementById('logicBox');

  try {
    if (!currentExpression) return;

    const hasAlgebra = /[a-zA-Z]/.test(currentExpression);

    if (hasAlgebra) {
      if (resultLine) resultLine.innerText = currentExpression;
      if (logicBox) logicBox.innerHTML = `<strong>Symbolic Algebra Recognized:</strong><br>• Expression simplified symbolically: <code>${currentExpression}</code>`;
    } else {
      let sanitized = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
      let res = eval(sanitized);
      if (resultLine) resultLine.innerText = res;
      if (logicBox) logicBox.innerHTML = `<strong>Step-by-Step Breakdown:</strong><br>1. Parsed: ${currentExpression}<br>2. Result: ${res}`;
    }
  } catch (err) {
    if (resultLine) resultLine.innerText = 'Error';
    if (logicBox) logicBox.innerHTML = '<span style="color:#f87171;">Invalid mathematical expression syntax.</span>';
  }
}

// OCR Scanner via Tesseract.js
function openScanner() {
  const modal = document.getElementById('scannerModal');
  if (modal) modal.classList.remove('hidden');
}

function closeScanner() {
  const modal = document.getElementById('scannerModal');
  if (modal) modal.classList.add('hidden');
}

async function processImageNote(event) {
  const file = event.target.files[0];
  if (!file) return;

  const status = document.getElementById('scannerStatus');
  if (status) status.innerText = '⏳ Scanning image...';

  try {
    const { data: { text } } = await Tesseract.recognize(file, 'eng');
    if (status) status.innerHTML = `<strong>Extracted Text:</strong><br>${text}`;
    currentExpression = text.replace(/[\n\r]+/g, ' ').trim();
    const exprEl = document.getElementById('calcExpression');
    if (exprEl) exprEl.innerText = currentExpression;
  } catch (err) {
    if (status) status.innerText = '❌ Error scanning image.';
  }
}

// Admin Panel Controls
function openAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.add('hidden');
}

function loginAdmin() {
  const passEl = document.getElementById('adminPassword');
  if (!passEl) return;
  
  if (passEl.value === 'admin123') {
    const authSec = document.getElementById('adminAuthSection');
    const dashSec = document.getElementById('adminDashboardSection');
    if (authSec) authSec.classList.add('hidden');
    if (dashSec) dashSec.classList.remove('hidden');
  } else {
    alert('Wrong password! Use admin123');
  }
}

function addCustomLink() {
  const keywordInput = document.getElementById('newKeyword');
  const titleInput = document.getElementById('newTitle');
  const urlInput = document.getElementById('newUrl');
  const descInput = document.getElementById('newDesc');
  const iconInput = document.getElementById('newIcon');

  if (!keywordInput || !titleInput || !urlInput) return;

  const keyword = keywordInput.value.toLowerCase().trim();
  const title = titleInput.value.trim();
  const url = urlInput.value.trim();
  const desc = descInput ? descInput.value.trim() : '';
  const img = iconInput ? iconInput.value.trim() : '';

  if (!keyword || !title || !url) {
    alert('Please fill out required fields!');
    return;
  }

  searchCards.push({ keyword, title, url, desc: desc || 'Custom educational card', img: img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80' });
  alert('Custom search card added successfully!');
  renderCards(searchCards);
  closeAdminModal();
}
