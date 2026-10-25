// Default Curated Study Cards
let searchCards = [
  { 
    keyword: 'math', 
    title: 'Wolfram Alpha Step-by-Step', 
    url: 'https://www.wolframalpha.com', 
    desc: 'Solve mathematics, algebra, geometry, and calculus problems with instant step-by-step solutions.', 
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    keyword: 'science', 
    title: 'NASA Science Hub', 
    url: 'https://science.nasa.gov', 
    desc: 'Explore space missions, planetary physics, astronomy facts, and earth science discoveries.', 
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80' 
  }
];

const forbiddenWords = ['adult', 'nsfw', 'xxx', 'sex', 'porn'];

window.addEventListener('DOMContentLoaded', () => {
  renderCards(searchCards);
});

// Tab Navigation Switcher
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(sec => sec.classList.add('hidden'));
  document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));

  if (tabName === 'search') {
    document.getElementById('searchSection').classList.remove('hidden');
    event.target.classList.add('active');
  } else if (tabName === 'calc') {
    document.getElementById('calcSection').classList.remove('hidden');
    event.target.classList.add('active');
  } else if (tabName === 'media') {
    document.getElementById('mediaSection').classList.remove('hidden');
    event.target.classList.add('active');
  }
}

// Perform AI Search (Direct Client-Side Engine for Zero Lag)
function handleSearch(event) {
  if (event.key === 'Enter') performSearch();
}

function performSearch() {
  const inputEl = document.getElementById('searchInput');
  const warningBox = document.getElementById('safetyWarning');
  if (!inputEl) return;

  const rawQuery = inputEl.value.trim();
  const query = rawQuery.toLowerCase();

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

  // Generate instant local AI response without waiting for server
  let title = rawQuery.charAt(0).toUpperCase() + rawQuery.slice(1);
  let desc = `Matel Independent AI Engine Analysis for "${rawQuery}": \n\n1. Core Definition: ${rawQuery} is a vital concept studied across primary and secondary school curricula.\n2. Detailed Breakdown: This topic covers fundamental principles essential for school exams, WAEC, NECO, and general student knowledge.\n3. Application: Understanding this helps build strong academic reasoning and problem-solving skills.`;
  let imgUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80';

  if (query.includes('moon')) {
    title = "The Moon";
    desc = "The Moon is Earth's only natural satellite. It is the fifth largest satellite in the Solar System and orbits Earth at an average distance of about 384,400 km, causing ocean tides.";
    imgUrl = 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=500&q=80';
  } else if (query.includes('sun')) {
    title = "The Sun";
    desc = "The Sun is the star at the center of our Solar System, made of hot plasma heated by nuclear fusion, providing energy for life on Earth.";
    imgUrl = 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=500&q=80';
  }

  renderCards([{ title, desc, img: imgUrl, url: '#' }]);
}

function renderCards(cards) {
  const grid = document.getElementById('searchResults');
  if (!grid) return;
  grid.innerHTML = '';

  if (!cards || cards.length === 0) {
    grid.innerHTML = '<p style="color:#94a3b8; text-align:center;">No workspace cards found.</p>';
    return;
  }

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <div class="card-img-container">
        <img src="${card.img}" alt="${card.title}">
      </div>
      <div class="card-content">
        <h4>${card.title}</h4>
        <p style="white-space: pre-line;">${card.desc}</p>
      </div>
    `;
    grid.appendChild(el);
  });
}

// Calculator Engine
let currentExpression = '';

function calcInput(val) {
  currentExpression += val;
  document.getElementById('calcExpression').innerText = currentExpression;
}

function calcAction(action) {
  if (action === 'AC') {
    currentExpression = '';
    document.getElementById('calcExpression').innerText = '';
    document.getElementById('calcResult').innerText = '0';
    document.getElementById('logicBox').innerHTML = '<p><em>Step-by-step mathematical breakdown will appear here...</em></p>';
  } else if (action === 'DEL') {
    currentExpression = currentExpression.slice(0, -1);
    document.getElementById('calcExpression').innerText = currentExpression;
  }
}

function calculateResult() {
  const resEl = document.getElementById('calcResult');
  const logicEl = document.getElementById('logicBox');

  try {
    if (!currentExpression) return;
    const isAlgebra = /[a-zA-Z]/.test(currentExpression);

    if (isAlgebra) {
      resEl.innerText = currentExpression;
      logicEl.innerHTML = `<strong>Symbolic Algebra Mode:</strong><br>• Formulated expression: <code>${currentExpression}</code>`;
    } else {
      let result = eval(currentExpression);
      resEl.innerText = result;
      logicEl.innerHTML = `<strong>Step-by-Step Solution:</strong><br>1. Expression: ${currentExpression}<br>2. Evaluated Output = <strong>${result}</strong>`;
    }
  } catch (err) {
    resEl.innerText = 'Error';
    logicEl.innerHTML = '<span style="color:#f87171;">Syntax error in mathematical expression.</span>';
  }
}

// Media YouTube Loader
function loadMedia() {
  const q = document.getElementById('mediaQuery').value.trim();
  if (!q) return;

  const feed = document.getElementById('mediaFeed');
  feed.innerHTML = `
    <div class="media-card">
      <h4>Search Results for "${q}"</h4>
      <div class="iframe-wrapper">
        <iframe src="https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(q)}" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
}

// Camera OCR Scanner
function openScanner() { document.getElementById('scannerModal').classList.remove('hidden'); }
function closeScanner() { document.getElementById('scannerModal').classList.add('hidden'); }

async function processImageNote(e) {
  const file = e.target.files[0];
  if (!file) return;

  const status = document.getElementById('scannerStatus');
  status.innerText = '⏳ Scanning image for text/math...';

  try {
    const { data: { text } } = await Tesseract.recognize(file, 'eng');
    status.innerHTML = `<strong>Extracted:</strong> ${text}`;
    currentExpression = text.replace(/[\n\r]+/g, ' ').trim();
    document.getElementById('calcExpression').innerText = currentExpression;
  } catch (err) {
    status.innerText = '❌ Failed to scan image.';
  }
}

// Admin Modal Controls
function openAdminModal() { document.getElementById('adminModal').classList.remove('hidden'); }
function closeAdminModal() { document.getElementById('adminModal').classList.add('hidden'); }

function loginAdmin() {
  const pass = document.getElementById('adminPassword').value;
  if (pass === 'admin123') {
    document.getElementById('adminAuthSection').classList.add('hidden');
    document.getElementById('adminDashboardSection').classList.remove('hidden');
  } else {
    alert('Invalid password!');
  }
}

function addCustomLink() {
  const keyword = document.getElementById('newKeyword').value.toLowerCase().trim();
  const title = document.getElementById('newTitle').value.trim();
  const url = document.getElementById('newUrl').value.trim();
  const desc = document.getElementById('newDesc').value.trim();

  if (!keyword || !title || !url) {
    alert('Please fill out all fields!');
    return;
  }

  searchCards.push({ keyword, title, url, desc: desc || 'Custom study resource', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80' });
  alert('Custom study resource added!');
  renderCards(searchCards);
  closeAdminModal();
}
