/* Toolbox by Harmno | github.com/harmno */
/* ═══════════════════════════════════════════
   Toolbox — main.js
   Renders tool cards, handles search + filters
   ═══════════════════════════════════════════ */

const ICONS = {
  type: '<line x1="4" y1="6.5" x2="20" y2="6.5"/><line x1="4" y1="12" x2="15" y2="12"/><line x1="4" y1="17.5" x2="17.5" y2="17.5"/>',
  case: '<path d="M3.5 17 8.2 6.5 12.9 17"/><path d="M5.2 13.4h6"/><circle cx="17.4" cy="14.6" r="3.1"/><path d="M20.5 11.7v5.8"/>',
  'file-text': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9.5" y1="13" x2="14.5" y2="13"/><line x1="9.5" y1="16.5" x2="14.5" y2="16.5"/>',
  braces: '<path d="M8.5 4H7a2 2 0 0 0-2 2v3.5a2 2 0 0 1-2 2 2 2 0 0 1 2 2V17a2 2 0 0 0 2 2h1.5"/><path d="M15.5 4H17a2 2 0 0 1 2 2v3.5a2 2 0 0 0 2 2 2 2 0 0 0-2 2V17a2 2 0 0 1-2 2h-1.5"/>',
  hash: '<line x1="9.2" y1="3.5" x2="7" y2="20.5"/><line x1="17" y1="3.5" x2="14.8" y2="20.5"/><line x1="3.8" y1="9" x2="21" y2="9"/><line x1="2.8" y1="15" x2="20" y2="15"/>',
  terminal: '<polyline points="5 7 10 12 5 17"/><line x1="12.5" y1="17" x2="19" y2="17"/>',
  merge: '<circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="9" r="2.4"/><path d="M6 8.4v7.2"/><path d="M18 11.4a6 6 0 0 1-6 4.4h-3.2"/>',
  minimize: '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/>',
  'file-output': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9.5" y1="13.5" x2="14.5" y2="13.5"/><polyline points="12.2 10.8 14.5 13.5 12.2 16.2"/>',
  image: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.6" cy="10.2" r="1.5"/><path d="m21 15.5-4.8-4.8L8.5 18.5"/>',
  maximize: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="13" y2="11"/><line x1="3" y1="21" x2="11" y2="13"/>',
  scissors: '<circle cx="6" cy="6.5" r="2.4"/><circle cx="6" cy="17.5" r="2.4"/><path d="M8.1 8 20 19.2"/><path d="M8.1 16 20 4.8"/>',
  ruler: '<path d="M3.5 16.5 16.5 3.5l4 4L7.5 20.5z"/><path d="M8.5 15.5l1.6 1.6"/><path d="M11.5 12.5l1.6 1.6"/><path d="M14.5 9.5l1.6 1.6"/><path d="M17.5 6.5l1.6 1.6"/>',
  dollar: '<circle cx="12" cy="12" r="9"/><path d="M12 6.8v10.4"/><path d="M15.1 9.3c-.5-1.1-1.7-1.8-3.1-1.8-1.8 0-3.1.9-3.1 2.4 0 3.3 6.4 1.7 6.4 4.6 0 1.5-1.5 2.4-3.3 2.4-1.6 0-2.9-.8-3.3-2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><line x1="8" y1="3" x2="8" y2="7.5"/><line x1="16" y1="3" x2="16" y2="7.5"/><line x1="3" y1="10" x2="21" y2="10"/>',
  percent: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="7.4" cy="7.4" r="2.4"/><circle cx="16.6" cy="16.6" r="2.4"/>',
  heart: '<path d="M12 20.2S4.4 15.5 2.6 11a5.4 5.4 0 0 1 9.4-4.6A5.4 5.4 0 0 1 21.4 11c-1.8 4.5-9.4 9.2-9.4 9.2z"/>',
};

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

const state = { query: '', category: 'all' };

const gridEl        = document.getElementById('toolsGrid');
const chipsEl       = document.getElementById('categories');
const searchInput   = document.getElementById('searchInput');
const searchForm    = document.getElementById('searchForm');
const resultCount   = document.getElementById('resultCount');
const emptyState    = document.getElementById('emptyState');
const emptyQuery    = document.getElementById('emptyQuery');
const clearSearchBtn= document.getElementById('clearSearchBtn');
const statTools     = document.getElementById('statTools');
const footerYear    = document.getElementById('footerYear');

/* ── Helpers ─────────────────────────────── */
function iconSVG(key) {
  const body = ICONS[key] || ICONS.type;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function filteredTools() {
  const q = state.query.trim().toLowerCase();
  return TOOLS.filter((tool) => {
    const inCategory = state.category === 'all' || tool.category === state.category;
    if (!inCategory) return false;
    if (!q) return true;
    const haystack = [tool.name, tool.desc, CATEGORY_LABELS[tool.category] || tool.category].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}

/* ── Render: category chips ──────────────── */
function renderChips() {
  chipsEl.innerHTML = CATEGORIES.map((cat) => {
    const count = cat.id === 'all' ? TOOLS.length : TOOLS.filter((t) => t.category === cat.id).length;
    const selected = state.category === cat.id;
    return `<button class="cat-chip" role="tab" aria-selected="${selected}" data-cat="${cat.id}">${escapeHTML(cat.label)}<span class="chip-count">${count}</span></button>`;
  }).join('');
}

/* ── Render: tool cards ──────────────────── */
function renderGrid() {
  const tools = filteredTools();

  resultCount.textContent = `Showing ${tools.length} of ${TOOLS.length} tools`;
  emptyState.hidden = tools.length !== 0;
  if (tools.length === 0) emptyQuery.textContent = state.query;

  gridEl.innerHTML = tools.map((tool) => {
    const isLive = tool.status === 'live';
    const badge = isLive
      ? '<span class="status-badge status-live">Live</span>'
      : '<span class="status-badge status-soon">Soon</span>';
    const catLabel = escapeHTML(CATEGORY_LABELS[tool.category] || tool.category);

    const inner = `
      <div class="tool-card-top">
        <div class="tool-icon tint-${escapeHTML(tool.category)}">${iconSVG(tool.icon)}</div>
        ${badge}
      </div>
      <div>
        <h3 class="tool-name">${escapeHTML(tool.name)}</h3>
        <p class="tool-desc">${escapeHTML(tool.desc)}</p>
      </div>
      <div class="tool-foot">
        <span class="tool-cat">${catLabel}</span>
        ${isLive ? '<svg class="tool-arrow" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' : ''}
      </div>`;

    return isLive
      ? `<a class="tool-card" href="${escapeHTML(tool.url)}" aria-label="Open ${escapeHTML(tool.name)}">${inner}</a>`
      : `<div class="tool-card is-soon" aria-label="${escapeHTML(tool.name)} — coming soon">${inner}</div>`;
  }).join('');
}

function refresh() {
  renderChips();
  renderGrid();
}

/* ── Events ──────────────────────────────── */
searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  renderGrid();
});

searchForm.addEventListener('submit', (e) => e.preventDefault());

chipsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.cat-chip');
  if (!btn) return;
  state.category = btn.dataset.cat;
  refresh();
});

document.getElementById('heroChips').addEventListener('click', (e) => {
  const btn = e.target.closest('.quick-chip');
  if (!btn) return;
  searchInput.value = btn.dataset.query;
  state.query = btn.dataset.query;
  renderGrid();
  document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  state.query = '';
  state.category = 'all';
  refresh();
  searchInput.focus();
});

/* Keyboard shortcut: "/" focuses search, Escape clears */
document.addEventListener('keydown', (e) => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
  if (e.key === '/' && !typing) {
    e.preventDefault();
    searchInput.focus();
  } else if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    state.query = '';
    renderGrid();
    searchInput.blur();
  }
});

/* ── Init ────────────────────────────────── */
statTools.textContent = TOOLS.length;
searchInput.placeholder = `Search ${TOOLS.length} tools… (try “word” or “json”)`;
footerYear.textContent = new Date().getFullYear();
refresh();
