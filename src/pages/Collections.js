// =========================================================
//  AARANYA — Collections Page
// =========================================================

import { PRODUCTS, CATEGORIES, OCCASIONS, MATERIALS, formatPrice, filterProducts } from '../data.js';
import { renderProductCard } from '../ProductCard.js';
import { initScrollReveal, initLazyImages, debounce } from '../utils.js';

let activeFilters = {
  category: 'all',
  occasion: null,
  material: null,
  minPrice: 0,
  maxPrice: Infinity,
  search: '',
  sort: 'default',
};

export function renderCollections(container, navigateFn, params = {}) {
  // Apply URL params to filters
  if (params.cat) activeFilters.category = params.cat;
  if (params.search) activeFilters.search = decodeURIComponent(params.search);
  if (params.occasion) activeFilters.occasion = params.occasion;

  container.innerHTML = `
    <!-- Page Header -->
    <div class="collections-hero bg-charcoal">
      <div class="container">
        <div class="collections-hero__inner">
          <p class="subtitle text-gold">Curated With Care</p>
          <h1 class="headline text-ivory" style="margin:var(--space-3) 0;">Our Collections</h1>
          <p class="body text-stone" style="max-width:520px;">
            Discover ${PRODUCTS.length} handcrafted pieces — from heirloom bridal sets to contemporary everyday jewellery.
          </p>
        </div>
      </div>
    </div>

    <!-- Collections Layout -->
    <div class="collections-layout container" style="padding-top:var(--space-10);padding-bottom:var(--space-16);">
      
      <!-- Sidebar Filters -->
      <aside class="collections-sidebar" aria-label="Filter jewellery">
        <div class="filter-panel">
          
          <!-- Mobile filter toggle -->
          <button class="filter-toggle" id="filter-toggle" aria-expanded="false" aria-controls="filter-body">
            <span>Filters</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M22 3H2l8 9.46V19l4 2v-8.54z" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>
          </button>

          <div class="filter-body" id="filter-body">

            <!-- Search within -->
            <div class="filter-section">
              <h3 class="filter-label">Search</h3>
              <div class="filter-search-wrap">
                <input 
                  type="search"
                  id="collection-search"
                  class="form-input"
                  placeholder="Necklace, ruby, bridal…"
                  value="${activeFilters.search || ''}"
                  aria-label="Search within collections"
                />
              </div>
            </div>

            <!-- Category -->
            <div class="filter-section">
              <h3 class="filter-label">Category</h3>
              <ul class="filter-list" role="list">
                ${CATEGORIES.map(cat => `
                  <li>
                    <button 
                      class="filter-item ${activeFilters.category === cat.id ? 'active' : ''}"
                      data-filter-cat="${cat.id}"
                      aria-pressed="${activeFilters.category === cat.id}"
                    >
                      <span aria-hidden="true">${cat.icon}</span>
                      ${cat.label}
                    </button>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Occasion -->
            <div class="filter-section">
              <h3 class="filter-label">Occasion</h3>
              <ul class="filter-list" role="list">
                <li>
                  <button 
                    class="filter-item ${!activeFilters.occasion ? 'active' : ''}"
                    data-filter-occasion=""
                    aria-pressed="${!activeFilters.occasion}"
                  >All Occasions</button>
                </li>
                ${OCCASIONS.map(occ => `
                  <li>
                    <button 
                      class="filter-item ${activeFilters.occasion === occ ? 'active' : ''}"
                      data-filter-occasion="${occ}"
                      aria-pressed="${activeFilters.occasion === occ}"
                    >
                      ${occ}
                    </button>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Material -->
            <div class="filter-section">
              <h3 class="filter-label">Material</h3>
              <ul class="filter-list" role="list">
                <li>
                  <button 
                    class="filter-item ${!activeFilters.material ? 'active' : ''}"
                    data-filter-material=""
                  >All Materials</button>
                </li>
                ${MATERIALS.map(mat => `
                  <li>
                    <button 
                      class="filter-item ${activeFilters.material === mat ? 'active' : ''}"
                      data-filter-material="${mat}"
                    >${mat}</button>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Budget -->
            <div class="filter-section">
              <h3 class="filter-label">Budget</h3>
              <div class="filter-budget">
                <button class="filter-budget-btn ${!activeFilters.minPrice && !isFinite(activeFilters.maxPrice) ? 'active' : ''}" data-min="0" data-max="">All Budgets</button>
                <button class="filter-budget-btn" data-min="0" data-max="25000">Under ₹25,000</button>
                <button class="filter-budget-btn" data-min="25000" data-max="75000">₹25k – ₹75k</button>
                <button class="filter-budget-btn" data-min="75000" data-max="200000">₹75k – ₹2L</button>
                <button class="filter-budget-btn" data-min="200000" data-max="">Above ₹2,00,000</button>
              </div>
            </div>

            <!-- Reset filters -->
            <button class="btn btn-outline w-full btn-sm" id="reset-filters" style="margin-top:var(--space-4);">
              Reset All Filters
            </button>
          </div>
        </div>
      </aside>

      <!-- Products Area -->
      <main class="collections-main" id="collections-main" aria-label="Jewellery products">
        
        <!-- Toolbar -->
        <div class="collections-toolbar">
          <p class="collections-count" id="product-count" aria-live="polite" aria-atomic="true">
            <!-- Updated by JS -->
          </p>
          
          <!-- Active filter chips -->
          <div class="filter-chips" id="filter-chips" aria-label="Active filters">
            <!-- Injected by JS -->
          </div>

          <div class="toolbar-right">
            <label for="sort-select" class="sr-only">Sort by</label>
            <select class="form-select" id="sort-select" style="width:auto;font-size:var(--text-sm);" aria-label="Sort products">
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        <!-- Grid / Empty state -->
        <div class="products-grid collections-products" id="products-grid" role="list" aria-label="Jewellery products">
          <!-- Products injected by JS -->
        </div>

        <!-- Empty state -->
        <div class="collections-empty" id="collections-empty" style="display:none;" aria-live="polite">
          <div class="empty-state">
            <span class="empty-state__icon">✦</span>
            <h3 class="title">No pieces found</h3>
            <p class="body text-stone">Try adjusting your filters or searching with different keywords.</p>
            <button class="btn btn-primary" id="empty-reset" style="margin-top:var(--space-6);">Clear Filters</button>
          </div>
        </div>
      </main>
    </div>
  `;

  // Wire up filters
  setupFilters(container, navigateFn);

  // Initial render
  renderProducts(container, navigateFn);

  // Init
  setTimeout(() => {
    initScrollReveal();
    initLazyImages();
  }, 50);
}

function setupFilters(container, navigateFn) {
  // Category buttons
  container.querySelectorAll('[data-filter-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilters.category = btn.dataset.filterCat;
      updateFilterUI(container, 'cat', btn);
      renderProducts(container, navigateFn);
    });
  });

  // Occasion buttons
  container.querySelectorAll('[data-filter-occasion]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilters.occasion = btn.dataset.filterOccasion || null;
      updateFilterUI(container, 'occasion', btn);
      renderProducts(container, navigateFn);
    });
  });

  // Material buttons
  container.querySelectorAll('[data-filter-material]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilters.material = btn.dataset.filterMaterial || null;
      updateFilterUI(container, 'material', btn);
      renderProducts(container, navigateFn);
    });
  });

  // Budget buttons
  container.querySelectorAll('.filter-budget-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilters.minPrice = parseFloat(btn.dataset.min) || 0;
      activeFilters.maxPrice = btn.dataset.max ? parseFloat(btn.dataset.max) : Infinity;
      container.querySelectorAll('.filter-budget-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(container, navigateFn);
    });
  });

  // Search
  const searchInput = container.querySelector('#collection-search');
  searchInput?.addEventListener('input', debounce(() => {
    activeFilters.search = searchInput.value;
    renderProducts(container, navigateFn);
  }, 300));

  // Sort
  const sortSelect = container.querySelector('#sort-select');
  sortSelect?.addEventListener('change', () => {
    activeFilters.sort = sortSelect.value;
    renderProducts(container, navigateFn);
  });

  // Reset
  container.querySelector('#reset-filters')?.addEventListener('click', resetFilters.bind(null, container, navigateFn));
  container.querySelector('#empty-reset')?.addEventListener('click', resetFilters.bind(null, container, navigateFn));

  // Mobile filter toggle
  const toggle = container.querySelector('#filter-toggle');
  const body = container.querySelector('#filter-body');
  toggle?.addEventListener('click', () => {
    const isOpen = body.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

function updateFilterUI(container, type, activeBtn) {
  // Remove active from siblings
  const attrMap = { cat: 'filter-cat', occasion: 'filter-occasion', material: 'filter-material' };
  const attr = attrMap[type];
  if (attr) {
    container.querySelectorAll(`[data-${attr}]`).forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
  }
  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-pressed', 'true');
}

function resetFilters(container, navigateFn) {
  activeFilters = { category: 'all', occasion: null, material: null, minPrice: 0, maxPrice: Infinity, search: '', sort: 'default' };
  // Reset UI
  container.querySelectorAll('.filter-item').forEach(b => b.classList.remove('active'));
  container.querySelector('[data-filter-cat="all"]')?.classList.add('active');
  container.querySelector('[data-filter-occasion=""]')?.classList.add('active');
  container.querySelector('[data-filter-material=""]')?.classList.add('active');
  container.querySelectorAll('.filter-budget-btn').forEach(b => b.classList.remove('active'));
  container.querySelector('[data-min="0"][data-max=""]')?.classList.add('active');
  const searchInput = container.querySelector('#collection-search');
  if (searchInput) searchInput.value = '';
  const sortSelect = container.querySelector('#sort-select');
  if (sortSelect) sortSelect.value = 'default';
  renderProducts(container, navigateFn);
}

function sortProducts(products) {
  const sorted = [...products];
  switch (activeFilters.sort) {
    case 'price-asc':   return sorted.sort((a,b) => (a.price ?? 99999999) - (b.price ?? 99999999));
    case 'price-desc':  return sorted.sort((a,b) => (b.price ?? 99999999) - (a.price ?? 99999999));
    case 'rating':      return sorted.sort((a,b) => b.rating - a.rating);
    case 'newest':      return sorted.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'name':        return sorted.sort((a,b) => a.name.localeCompare(b.name));
    default:            return sorted;
  }
}

function renderProducts(container, navigateFn) {
  const grid = container.querySelector('#products-grid');
  const empty = container.querySelector('#collections-empty');
  const count = container.querySelector('#product-count');
  const chips = container.querySelector('#filter-chips');

  if (!grid) return;

  const filtered = filterProducts(activeFilters);
  const sorted   = sortProducts(filtered);

  // Update count
  if (count) {
    count.textContent = `${sorted.length} piece${sorted.length !== 1 ? 's' : ''}`;
  }

  // Update filter chips
  if (chips) {
    const activeChips = [];
    if (activeFilters.category !== 'all') activeChips.push({ label: activeFilters.category, type: 'category' });
    if (activeFilters.occasion) activeChips.push({ label: activeFilters.occasion, type: 'occasion' });
    if (activeFilters.material) activeChips.push({ label: activeFilters.material, type: 'material' });
    if (activeFilters.search) activeChips.push({ label: `"${activeFilters.search}"`, type: 'search' });

    chips.innerHTML = activeChips.map(chip => `
      <span class="filter-chip">
        ${chip.label}
        <button aria-label="Remove ${chip.label} filter" data-remove-type="${chip.type}">×</button>
      </span>
    `).join('');

    chips.querySelectorAll('[data-remove-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.removeType;
        if (t === 'category') { activeFilters.category = 'all'; container.querySelector('[data-filter-cat="all"]')?.click(); }
        if (t === 'occasion') { activeFilters.occasion = null; container.querySelector('[data-filter-occasion=""]')?.click(); }
        if (t === 'material') { activeFilters.material = null; container.querySelector('[data-filter-material=""]')?.click(); }
        if (t === 'search') { activeFilters.search = ''; const si = container.querySelector('#collection-search'); if (si) si.value = ''; renderProducts(container, navigateFn); }
      });
    });
  }

  // Show/hide empty state
  grid.style.display = sorted.length > 0 ? 'grid' : 'none';
  if (empty) empty.style.display = sorted.length === 0 ? 'block' : 'none';

  // Render cards
  grid.innerHTML = '';
  sorted.forEach((product, i) => {
    const card = renderProductCard(product, navigateFn);
    card.setAttribute('role', 'listitem');
    card.classList.add(`delay-${(i % 5) + 1}`);
    grid.appendChild(card);
  });

  setTimeout(() => {
    initScrollReveal();
    initLazyImages();
  }, 50);
}

export function getCollectionsStyles() {
  return `
.collections-hero {
  padding: 140px 0 var(--space-12);
}
.collections-hero__inner {
  max-width: 600px;
}
.collections-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-10);
  align-items: start;
}
.collections-sidebar {
  position: sticky;
  top: 90px;
}
.filter-panel {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.filter-toggle {
  display: none;
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-charcoal);
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-cream);
  cursor: pointer;
  background: var(--color-white);
}
.filter-body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.filter-section {
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-cream);
}
.filter-section:last-child { border-bottom: none; }
.filter-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-stone);
  margin-bottom: var(--space-3);
}
.filter-list { display: flex; flex-direction: column; gap: var(--space-1); }
.filter-item {
  width: 100%;
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-charcoal);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.filter-item:hover { background: var(--color-cream); }
.filter-item.active {
  background: var(--color-champagne);
  color: var(--color-gold-deep);
  font-weight: 600;
}
.filter-search-wrap { margin-top: var(--space-2); }
.filter-budget {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.filter-budget-btn {
  width: 100%;
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-charcoal);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.filter-budget-btn:hover { background: var(--color-cream); }
.filter-budget-btn.active { background: var(--color-champagne); color: var(--color-gold-deep); font-weight: 600; }

.collections-main {}
.collections-toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-cream);
}
.collections-count {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  color: var(--color-charcoal);
  font-weight: 500;
}
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 2px var(--space-3);
  background: var(--color-champagne);
  color: var(--color-gold-deep);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}
.filter-chip button {
  color: var(--color-gold-deep);
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
}
.toolbar-right { margin-left: auto; }
.collections-products {
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.empty-state {
  text-align: center;
  padding: var(--space-16) var(--space-8);
}
.empty-state__icon {
  display: block;
  font-size: 3rem;
  color: var(--color-gold);
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

@media (max-width: 1024px) {
  .collections-layout { grid-template-columns: 1fr; }
  .collections-sidebar { position: static; }
  .filter-toggle { display: flex; }
  .filter-body { display: none; }
  .filter-body.open { display: flex; }
  .collections-products { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .collections-hero { padding: 100px 0 var(--space-8); }
  .collections-products { grid-template-columns: 1fr 1fr; gap: var(--space-4); }
  .collections-toolbar { flex-direction: column; }
}
@media (max-width: 380px) {
  .collections-products { grid-template-columns: 1fr; }
}
`;
}
