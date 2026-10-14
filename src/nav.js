
// =========================================================
// AARANYA — Navigation Component
// =========================================================

import { store } from './data.js';

const NAV_ITEMS = [
  {
    label: 'Collections',
    href: '/collections',
    // children: [
    //   { label: 'All Jewellery', href: '/collections?cat=all' },
    //   { label: 'Necklaces & Chokers', href: '/collections?cat=necklaces' },
    //   { label: 'Rings & Solitaires', href: '/collections?cat=rings' },
    //   { label: 'Earrings & Jhumkas', href: '/collections?cat=earrings' },
    //   { label: 'Bangles & Cuffs', href: '/collections?cat=bangles' },
    //   { label: 'Bracelets & Kada', href: '/collections?cat=bracelets' },
    //   { label: 'Pendants', href: '/collections?cat=pendants' },
    //   { label: '—', divider: true },
    //   { label: '♛ Royal Bridal Sets', href: '/collections?cat=bridal' },
    //   { label: '✦ Everyday Luxury', href: '/collections?cat=everyday' },
    //   { label: '💎 Gemstone High Jewellery', href: '/collections?cat=gemstones' },
    //   { label: "❖ Men's Regal Line", href: '/collections?cat=mens' },
    //   { label: '🎁 Gifting & Keepsakes', href: '/collections?cat=gifting' },
    // ],
  },

  { label: 'Bridal', href: '/collections?cat=bridal' },
  { label: "Men's", href: '/collections?cat=mens' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function renderNav(navigateFn) {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <div class="container-wide">
      <nav class="nav-inner" role="navigation" aria-label="Main navigation">
        <a href="/" class="nav-logo" aria-label="AARANYA — Home" data-link>
          <span class="nav-logo-mark" aria-hidden="true">✦</span>
          <span class="nav-logo-text">AARANYA</span>
          <span class="nav-logo-tagline">Modern Indian Luxury</span>
        </a>

        <div class="nav-links" role="list">
          ${NAV_ITEMS.map(item => item.children ? `
            <div class="nav-dropdown" role="listitem">
              <button
                type="button"
                class="nav-link nav-dropdown-trigger"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ${item.label}
                <svg
                  style="display:inline;width:10px;height:10px;margin-left:4px;vertical-align:middle;"
                  viewBox="0 0 10 6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M1 1l4 4 4-4"/>
                </svg>
              </button>

              <div class="nav-dropdown-menu" role="menu">
                ${item.children.map(child => child.divider
    ? '<div class="dropdown-divider" role="separator"></div>'
    : `<a href="${child.href}" class="dropdown-item" role="menuitem" data-link>${child.label}</a>`
  ).join('')}
              </div>
            </div>
          ` : `
            <div role="listitem">
              <a href="${item.href}" class="nav-link" data-link>${item.label}</a>
            </div>
          `).join('')}
        </div>

        <div class="nav-actions">
          <button class="nav-action-btn" id="nav-search-btn" aria-label="Search jewellery">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <button class="nav-action-btn" id="nav-wishlist-btn" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span class="nav-badge" id="wishlist-count" aria-label="Items in wishlist" style="display:none">0</span>
          </button>

          <button class="nav-action-btn" id="nav-cart-btn" aria-label="Shopping cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="nav-badge" id="cart-count" aria-label="Items in cart" style="display:none">0</span>
          </button>

          <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </nav>
    </div>
  `;

  renderMobileMenu(navigateFn);
  renderSearchOverlay();

  // Header scroll effect
  const handleScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    document.getElementById('site-masthead')?.classList.toggle('scrolled', scrolled);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Cart and wishlist counts
  updateNavCounts();
  document.removeEventListener('cart:updated', updateNavCounts);
  document.removeEventListener('wishlist:updated', updateNavCounts);
  document.addEventListener('cart:updated', updateNavCounts);
  document.addEventListener('wishlist:updated', updateNavCounts);

  // SPA navigation for links
  header.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const href = link.getAttribute('href');
      closeDropdowns();

      navigateFn(href);
    });
  });

  // Collections dropdown: click to open, not navigate
  // const dropdown = header.querySelector('.nav-dropdown');
  // const dropdownTrigger = header.querySelector('.nav-dropdown-trigger');

  // dropdownTrigger?.addEventListener('click', event => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   const willOpen = !dropdown.classList.contains('open');

  //   closeDropdowns();

  //   if (willOpen) {
  //     dropdown.classList.add('open');
  //     dropdownTrigger.setAttribute('aria-expanded', 'true');
  //   }
  // });

  // // Close dropdown when clicking elsewhere
  // document.addEventListener('click', handleOutsideDropdownClick);
  // document.addEventListener('keydown', handleDropdownEscape);

  // function handleOutsideDropdownClick(event) {
  //   if (!dropdown?.contains(event.target)) {
  //     closeDropdowns();
  //   }
  // }

  // function handleDropdownEscape(event) {
  //   if (event.key === 'Escape') {
  //     closeDropdowns();
  //   }
  // }

  // function closeDropdowns() {
  //   header.querySelectorAll('.nav-dropdown.open').forEach(element => {
  //     element.classList.remove('open');
  //     element.querySelector('.nav-dropdown-trigger')
  //       ?.setAttribute('aria-expanded', 'false');
  //   });
  // }

  // Mobile menu controls
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileOverlay?.addEventListener('click', closeMobileMenu);

  function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Search controls
  const searchBtn = document.getElementById('nav-search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');

  searchBtn?.addEventListener('click', () => {
    searchOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  });

  searchClose?.addEventListener('click', closeSearch);

  searchOverlay?.addEventListener('click', event => {
    if (event.target === searchOverlay) closeSearch();
  });

  function closeSearch() {
    searchOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  searchInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter' && searchInput.value.trim()) {
      const query = searchInput.value.trim();
      closeSearch();
      navigateFn('/collections?search=' + encodeURIComponent(query));
      searchInput.value = '';
    }

    if (event.key === 'Escape') closeSearch();
  });

  searchOverlay?.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      closeSearch();
      navigateFn('/collections?search=' + encodeURIComponent(tag.textContent.trim()));
    });
  });

  // Cart and wishlist navigation
  document.getElementById('nav-cart-btn')?.addEventListener('click', () => {
    navigateFn('/cart');
  });

  document.getElementById('nav-wishlist-btn')?.addEventListener('click', () => {
    navigateFn('/wishlist');
  });

  updateActiveLink();
}

function updateNavCounts() {
  const cartCount = document.getElementById('cart-count');
  const wishlistCount = document.getElementById('wishlist-count');
  const cartTotal = store.cartCount();
  const wishlistTotal = store.wishlist.length;

  if (cartCount) {
    cartCount.textContent = cartTotal > 9 ? '9+' : String(cartTotal);
    cartCount.style.display = cartTotal > 0 ? 'flex' : 'none';
  }

  if (wishlistCount) {
    wishlistCount.textContent = wishlistTotal > 9 ? '9+' : String(wishlistTotal);
    wishlistCount.style.display = wishlistTotal > 0 ? 'flex' : 'none';
  }
}

function renderMobileMenu(navigateFn) {
  document.getElementById('mobile-menu')?.remove();
  document.getElementById('mobile-menu-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'mobile-menu-overlay';
  overlay.className = 'mobile-menu-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const menu = document.createElement('div');
  menu.id = 'mobile-menu';
  menu.className = 'mobile-menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Navigation menu');
  menu.setAttribute('aria-modal', 'true');

  menu.innerHTML = `
    <div class="mobile-nav-links">
      <a href="/" class="mobile-nav-link" data-link>Home</a>
      <a href="/collections?cat=all" class="mobile-nav-link" data-link>All Collections</a>

      <div class="mobile-nav-sub">
        <a href="/collections?cat=bridal" data-link>♛ Royal Bridal Sets</a>
        <a href="/collections?cat=necklaces" data-link>Necklaces &amp; Chokers</a>
        <a href="/collections?cat=rings" data-link>Rings &amp; Solitaires</a>
        <a href="/collections?cat=earrings" data-link>Earrings &amp; Jhumkas</a>
        <a href="/collections?cat=bangles" data-link>Bangles &amp; Cuffs</a>
        <a href="/collections?cat=bracelets" data-link>Bracelets &amp; Kada</a>
        <a href="/collections?cat=pendants" data-link>Pendants</a>
        <a href="/collections?cat=mens" data-link>❖ Men's Regal Line</a>
        <a href="/collections?cat=everyday" data-link>✦ Everyday Luxury</a>
        <a href="/collections?cat=gemstones" data-link>💎 Gemstone High Jewellery</a>
        <a href="/collections?cat=gifting" data-link>🎁 Gifting &amp; Keepsakes</a>
      </div>

      <a href="/consultation" class="mobile-nav-link" data-link>Private Consultation</a>
      <a href="/lookbook" class="mobile-nav-link" data-link>Lookbook</a>
      <a href="/about" class="mobile-nav-link" data-link>About AARANYA</a>
      <a href="/contact" class="mobile-nav-link" data-link>Contact &amp; Enquiry</a>
    </div>

    <div class="mobile-nav-actions">
      <a href="/cart" class="btn btn-primary w-full" data-link>View Cart</a>
      <a href="/wishlist" class="btn btn-outline w-full" data-link style="color:var(--color-gold);border-color:var(--color-gold);">Wishlist</a>
    </div>

    <div style="margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid rgba(201,169,110,0.15);">
      <p style="font-size:var(--text-xs);color:var(--color-stone-light);letter-spacing:0.1em;margin-bottom:var(--space-3);">CONTACT US</p>
      <p style="font-size:var(--text-sm);color:rgba(250,247,242,0.6);">XXXXXXXXXX</p>
      <p style="font-size:var(--text-sm);color:rgba(250,247,242,0.6);">hello@aaranya.in</p>
    </div>
  `;

  menu.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const href = link.getAttribute('href');

      menu.classList.remove('open');
      overlay.classList.remove('open');

      document.getElementById('nav-hamburger')?.classList.remove('open');
      document.getElementById('nav-hamburger')?.setAttribute('aria-expanded', 'false');

      document.body.style.overflow = '';
      navigateFn(href);
    });
  });

  document.body.appendChild(overlay);
  document.body.appendChild(menu);
}

function renderSearchOverlay() {
  document.getElementById('search-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.setAttribute('role', 'search');

  overlay.innerHTML = `
    <div class="search-box">
      <div class="search-input-wrap">
        <svg style="width:24px;height:24px;stroke:var(--color-gold);fill:none;stroke-width:1.5;flex-shrink:0;" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>

        <input
          type="search"
          id="search-input"
          class="search-input"
          placeholder="Search jewellery, gemstones, occasions…"
          autocomplete="off"
          aria-label="Search"
        />

        <button class="search-close" id="search-close" aria-label="Close search">×</button>
      </div>

      <p class="search-hint">Press Enter to search · Escape to close</p>

      <div class="search-tags" aria-label="Quick searches">
        <button type="button" class="search-tag">Gold Necklace</button>
        <button type="button" class="search-tag">Diamond Ring</button>
        <button type="button" class="search-tag">Bridal Set</button>
        <button type="button" class="search-tag">Emerald</button>
        <button type="button" class="search-tag">Jhumka Earrings</button>
        <button type="button" class="search-tag">Bangles</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

export function updateActiveLink() {
  const currentUrl = new URL(window.location.href);
  const currentPath = currentUrl.pathname;
  const currentCategory = currentUrl.searchParams.get('cat');

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkUrl = new URL(href, window.location.origin);
    const linkPath = linkUrl.pathname;
    const linkCategory = linkUrl.searchParams.get('cat');

    let isActive = false;

    if (link.classList.contains('nav-dropdown-trigger')) {
      isActive = false;
    } else if (linkPath === '/collections') {
      if (linkCategory) {
        isActive =
          currentPath === '/collections' &&
          currentCategory === linkCategory;
      } else {
        isActive = false;
      }
    } else if (linkPath === '/') {
      isActive = currentPath === '/' && href === '/';
    } else {
      isActive = currentPath === linkPath;
    }

    link.classList.toggle('active', isActive);
  });
}
