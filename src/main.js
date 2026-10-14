
// =========================================================
//  AARANYA — Luxury Indian Jewellery Experience
//  Core SPA Orchestrator, Router & Layout Engine
// =========================================================

import './style.css';
import './nav.css';

import { renderNav, updateActiveLink } from './nav.js';
import { renderFooter, getFooterStyles } from './footer.js';
import { renderHome, getHomeStyles } from './pages/Home.js';
import { renderCollections, getCollectionsStyles } from './pages/Collections.js';
import { renderProductDetail, getProductDetailStyles } from './pages/ProductDetail.js';
import { renderCart, getCartStyles } from './pages/Cart.js';
import {
  renderWishlist,
  renderAbout,
  renderContact,
  renderLookbook,
  renderConsultation,
  getExtraPageStyles
} from './pages/OtherPages.js';
import { store } from './data.js';
import { initScrollReveal, initLazyImages } from './utils.js';

// ── Inject Component & Page Styles into Head ───────────────
function injectPageStyles() {
  const existing = document.getElementById('aaranya-injected-styles');
  if (existing) return;

  const styleEl = document.createElement('style');
  styleEl.id = 'aaranya-injected-styles';

  styleEl.textContent = `
    ${getHomeStyles()}
    ${getCollectionsStyles()}
    ${getProductDetailStyles()}
    ${getCartStyles()}
    ${getExtraPageStyles()}
    ${getFooterStyles()}

    /* ── Site Masthead ───────────────────────────────────── */
    .site-masthead {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-nav);
      transition: all var(--transition-base);
    }


    /* ── Floating Demo Concierge Widget ──────────────────── */
    .whatsapp-concierge-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 250;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #1a3326;
      border: 1px solid rgba(201,169,110,0.4);
      color: var(--color-ivory);
      padding: 10px 18px 10px 14px;
      border-radius: var(--radius-full);
      box-shadow: 0 8px 30px rgba(0,0,0,0.35);
      cursor: pointer;
      text-decoration: none;
      font: inherit;
      transition:
        transform var(--transition-base),
        box-shadow var(--transition-base),
        background var(--transition-fast);
    }

    .whatsapp-concierge-widget:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 35px rgba(201,169,110,0.3);
      background: #244634;
      color: var(--color-ivory);
    }

    .whatsapp-concierge-widget:focus-visible {
      outline: 2px solid var(--color-gold);
      outline-offset: 4px;
    }

    .whatsapp-icon-circle {
      width: 28px;
      height: 28px;
      background: #25d366;
      color: #fff;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      flex-shrink: 0;
    }

    .whatsapp-label {
      font-size: 0.8rem;
      letter-spacing: 0.04em;
      font-weight: 500;
      white-space: nowrap;
    }

    .whatsapp-status-dot {
      width: 7px;
      height: 7px;
      background: #c9a96e;
      border-radius: var(--radius-full);
      flex-shrink: 0;
    }

    @media (max-width: 600px) {
      .whatsapp-concierge-widget {
        bottom: 16px;
        right: 16px;
        padding: 9px 14px;
        gap: 8px;
      }

      .whatsapp-label {
        font-size: 0.75rem;
      }
    }

    /* ── Back to Top Button ──────────────────────────────── */
    .back-to-top-btn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 250;
      width: 42px;
      height: 42px;
      border-radius: var(--radius-full);
      background: var(--color-charcoal);
      border: 1px solid rgba(201,169,110,0.3);
      color: var(--color-gold);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all var(--transition-base);
      box-shadow: var(--shadow-md);
    }

    .back-to-top-btn.visible {
      opacity: 0.9;
      visibility: visible;
    }

    .back-to-top-btn:hover {
      opacity: 1;
      transform: translateY(-3px);
      border-color: var(--color-gold);
    }

    .back-to-top-btn:focus-visible {
      outline: 2px solid var(--color-gold);
      outline-offset: 4px;
    }
  `;

  document.head.appendChild(styleEl);
}

// ── Application Initialization ────────────────────────────
function initApp() {
  injectPageStyles();

  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = `
    <!-- Site Masthead -->
    <div id="site-masthead" class="site-masthead">

     

      <!-- Site Header -->
      <header
        id="site-header"
        class="site-header"
        role="banner"
      ></header>
    </div>

    <!-- Main Content -->
    <main id="main-content" role="main" tabindex="-1"></main>

    <!-- Site Footer -->
    <footer id="site-footer" role="contentinfo"></footer>

    <!-- Toast Notification Container -->
    <div
      id="toast-container"
      aria-live="polite"
      aria-atomic="true"
    ></div>

    <!-- Floating Demo Concierge -->
    <button
      type="button"
      class="whatsapp-concierge-widget"
      aria-label="Demo jewellery concierge"
      id="whatsapp-float-btn"
    >
      <span class="whatsapp-icon-circle" aria-hidden="true">💬</span>
      <span class="whatsapp-label">Jewellery Concierge</span>
      <span
        class="whatsapp-status-dot"
        aria-hidden="true"
        title="Demo mode"
      ></span>
    </button>

    <!-- Back to Top Button -->
    <button
      class="back-to-top-btn"
      id="back-to-top-btn"
      aria-label="Scroll back to top"
      type="button"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  `;

  // Floating concierge: demo-only interaction
  const conciergeBtn = document.getElementById('whatsapp-float-btn');

  conciergeBtn?.addEventListener('click', () => {
    alert(
      'Welcome to AARANYA! WhatsApp enquiries are disabled in this demo.'
    );
  });

  // Back to top behavior
  const bttBtn = document.getElementById('back-to-top-btn');

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 400) {
        bttBtn?.classList.add('visible');
      } else {
        bttBtn?.classList.remove('visible');
      }
    },
    { passive: true }
  );

  bttBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Render Persistent Navigation & Footer
  renderNav(navigate);
  renderFooter(navigate);

  // Global link interception for SPA links
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[data-link]');

    if (link && link.href) {
      const url = new URL(link.href);

      if (url.origin === window.location.origin) {
        e.preventDefault();
        navigate(url.pathname + url.search);
      }
    }
  });

  // Listen for browser back / forward
  window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname + window.location.search);
  });

  // Initial Route Load
  handleRoute(window.location.pathname + window.location.search);
}

// ── Client-Side Router ─────────────────────────────────────
export function navigate(urlStr, replace = false) {
  if (replace) {
    history.replaceState(null, '', urlStr);
  } else {
    history.pushState(null, '', urlStr);
  }

  handleRoute(urlStr);
}

function handleRoute(urlStr) {
  const url = new URL(urlStr, window.location.origin);
  const path = url.pathname.replace(/\/$/, '') || '/';

  const mainContainer = document.getElementById('main-content');
  if (!mainContainer) return;

  // Clear previous page
  mainContainer.innerHTML = '';
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Parse Query Parameters
  const params = {};

  url.searchParams.forEach((val, key) => {
    params[key] = val;
  });

  // Route Dispatcher
  if (path === '/' || path === '') {
    document.title = 'AARANYA — Modern Indian Luxury Jewellery';
    renderHome(mainContainer, navigate);

  } else if (path === '/collections') {
    const catLabel = params.cat ? params.cat.toUpperCase() : 'ALL';
    document.title = `Collections [${catLabel}] — AARANYA Luxury Jewellery`;
    renderCollections(mainContainer, navigate, params);

  } else if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '').replace(/\/$/, '');
    document.title = 'Product Details — AARANYA Luxury Jewellery';
    renderProductDetail(mainContainer, navigate, slug);

  } else if (path === '/cart') {
    document.title = 'Shopping Bag — AARANYA Luxury Jewellery';
    renderCart(mainContainer, navigate);

  } else if (path === '/wishlist') {
    document.title = 'My Wishlist — AARANYA Luxury Jewellery';
    renderWishlist(mainContainer, navigate);

  } else if (path === '/about') {
    document.title = 'Our Heritage & Story — AARANYA Luxury Jewellery';
    renderAbout(mainContainer, navigate);

  } else if (path === '/contact') {
    document.title = 'Contact & Private Salon — AARANYA Luxury Jewellery';
    renderContact(mainContainer, navigate);

  } else if (path === '/lookbook') {
    document.title = 'Lookbook 2026 — AARANYA Luxury Jewellery';
    renderLookbook(mainContainer, navigate);

  } else if (path === '/consultation') {
    document.title = 'Book Private Consultation — AARANYA Luxury Jewellery';
    renderConsultation(mainContainer, navigate);

  } else {
    // 404 Page
    document.title = 'Page Not Found — AARANYA Luxury Jewellery';

    mainContainer.innerHTML = `
      <div
        class="container section text-center"
        style="padding-top:calc(var(--space-24) + 60px);min-height:60vh;"
      >
        <span
          style="font-size:3rem;color:var(--color-gold);display:block;margin-bottom:var(--space-3);"
          aria-hidden="true"
        >✦</span>

        <h1 class="headline" style="margin-bottom:var(--space-4);">
          Piece Not Found
        </h1>

        <p
          class="body text-stone"
          style="max-width:480px;margin:0 auto var(--space-8);"
        >
          The page or jewellery curation you are searching for is unavailable
          or has moved to our private vault.
        </p>

        <a href="/collections" class="btn btn-primary btn-lg" data-link>
          Browse All Collections
        </a>
      </div>
    `;
  }

  // Update active navigation states
  updateActiveLink(path);

  // Trigger animations and lazy loaders
  setTimeout(() => {
    initScrollReveal();
    initLazyImages();
  }, 40);
}

// ── Start Application When DOM Is Ready ────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
