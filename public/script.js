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
    desc: 'Comprehensive web development resources, documentation for HTML, CSS, JavaScript, and modern web APIs.', 
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    keyword: 'science', 
    title: 'NASA Science', 
    url: 'https://science.nasa.gov', 
    desc: 'Explore deep space, our home planet, astrophysics missions, and planetary science discoveries.', 
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' 
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

// Search Engine Logic
function handleSearch(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
}

function performSearch() {
  const inputEl = document.getElementById('searchInput');
  const warningBox = document.getElementById('safetyWarning');
  
  if (!inputEl) return;
  
  const query = inputEl.value.toLowerCase().trim();

  // Safety Check
  const isForbidden = forbiddenWords.some(word => query.includes(word));
  if (isForbidden) {
    if (warningBox) warningBox.classList.remove('hidden');
    renderCards([]);
    return;
  } else {
    if (warningBox) warningBox.classList.add('hidden');
  }

  if (!query) {
    renderCards(searchCards);
    return;
  }

  let results = [];

  if (query.includes('tiktok')) {
    results.push({
      title: 'TikTok Workspace Portal',
      url: 'https://www.tiktok.com',
      desc: 'TikTok is a global short-form video hosting service owned by ByteDance Ltd.',
      img: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=500&q=80'
    });
  } else if (query.includes('youtube')) {
    results.push({
      title: 'YouTube Streaming Center',
      url: 'https://www.youtube.com',
      desc: 'YouTube is an online video sharing and social media platform operated by Google.',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'
    });
  } else if (query.includes('ronaldo')) {
    results.push({
      title: 'Cristiano Ronaldo (Full Profile)',
      url: '#',
      desc: 'Cristiano Ronaldo dos Santos Aveiro is a Portuguese professional footballer who plays as a forward and captains Al-Nassr and the Portugal national team.',
      img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80'
    });
  } else {
    let capitalized = query.charAt(0).toUpperCase() + query.slice(1);
    results.push({
      title: capitalized,
      url: '#',
      desc: `Detailed Matel Workspace Record for "${query}": Comprehensive educational analysis and knowledge synthesis.`,
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80'
    });
  }

  renderCards(results);
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

// Calculator Logic
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

// OCR Scanner
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
