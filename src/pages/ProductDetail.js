// =========================================================
//  AARANYA — Product Detail Page
// =========================================================

import { PRODUCTS, store, formatPrice, getProductBySlug } from '../data.js';
import { showToast, initScrollReveal, initLazyImages, createModal } from '../utils.js';
import { renderProductCard } from '../ProductCard.js';

export function renderProductDetail(container, navigateFn, slug) {
  const product = getProductBySlug(slug);

  if (!product) {
    container.innerHTML = `
      <div class="not-found container section text-center">
        <h1 class="headline">Product Not Found</h1>
        <p class="body text-stone" style="margin:var(--space-4) 0;">The jewellery piece you're looking for isn't available.</p>
        <a href="/collections" class="btn btn-primary btn-lg" data-link>Browse Collections</a>
      </div>
    `;
    container.querySelector('[data-link]')?.addEventListener('click', e => {
      e.preventDefault();
      navigateFn('/collections');
    });
    return;
  }

  const inWishlist = store.isInWishlist(product.id);
  const isEnquire = product.isEnquireOnly || product.price === null;
  const discount = product.originalPrice && product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;
  const related = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.material === product.material)).slice(0, 3);

  container.innerHTML = `
    <!-- Breadcrumb -->
   
<nav class="breadcrumb container" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li><a href="/" data-link class="breadcrumb__link">Home</a></li>
    <li aria-hidden="true" class="breadcrumb__sep">›</li>
    <li><a href="/collections" data-link class="breadcrumb__link">Collections</a></li>
    <li aria-hidden="true" class="breadcrumb__sep">›</li>
    <li><a href="/collections?cat=${product.category}" data-link class="breadcrumb__link">${capitalise(product.category)}</a></li>
    <li aria-hidden="true" class="breadcrumb__sep">›</li>
    <li aria-current="page" class="breadcrumb__current">${product.name}</li>
  </ol>
</nav>


    <!-- Product Layout -->
    <div class="product-detail container" style="padding-bottom:var(--space-20);">
      
      <!-- Image Gallery -->
      <section class="product-gallery" aria-label="Product images">
        <div class="gallery-main" id="gallery-main">
          <img
            id="gallery-hero"
            src="${product.image}"
            alt="${product.name} — main product photograph"
            class="gallery-hero-img"
            width="700"
            height="900"
          />
          ${product.badge ? `<div class="gallery-badge"><span class="badge ${getBadgeClass(product.badge)}">${product.badge}</span></div>` : ''}
          ${discount ? `<div class="gallery-discount"><span class="badge badge-burgundy">-${discount}%</span></div>` : ''}
        </div>

        <div class="gallery-thumbs" role="list" aria-label="Product image thumbnails">
          ${product.gallery.map((img, i) => `
            <button 
              class="gallery-thumb ${i === 0 ? 'active' : ''}"
              role="listitem"
              aria-label="View image ${i + 1}"
              aria-pressed="${i === 0}"
              data-img="${img}"
              data-idx="${i}"
            >
              <img src="${img}" alt="${product.name} view ${i + 1}" loading="lazy" width="100" height="120" />
            </button>
          `).join('')}
        </div>
      </section>

      <!-- Product Info -->
      <section class="product-info" aria-label="Product information">
        
        <!-- Header -->
        <div class="product-info__header">
          <div class="product-info__meta">
            <span class="product-info__category">${product.material}</span>
            <span class="product-info__purity">· ${product.purity}</span>
          </div>
          <h1 class="title" style="margin:var(--space-3) 0;font-size:clamp(1.6rem,3vw,2.2rem);">${product.name}</h1>
          
          <div class="product-info__rating" aria-label="Customer rating">
            <div class="rating-stars" aria-label="${product.rating} stars">
              ${renderDetailStars(product.rating)}
            </div>
            <span class="rating-count">${product.reviews} reviews</span>
            <button class="rating-link" aria-label="Read reviews">Read Reviews</button>
          </div>
        </div>

        <!-- Pricing -->
        <div class="product-info__pricing" aria-label="Product price">
          ${isEnquire ? `
            <div class="price-display">
              <span class="price-current text-gold" style="font-size:clamp(1.5rem,2.5vw,2rem);font-weight:600;">Price on Request</span>
              <span class="badge badge-gold">Bespoke Masterpiece</span>
            </div>
            <p class="price-note">Heirloom piece made to order · Quotation and private consultation provided on request</p>
          ` : `
            <div class="price-display">
              <span class="price-current">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `
                <span class="price-original">${formatPrice(product.originalPrice)}</span>
                <span class="badge badge-burgundy" aria-label="${discount}% discount">-${discount}%</span>
              ` : ''}
            </div>
            <p class="price-note">Including all taxes · BIS Hallmarked · GST Invoice provided</p>
          `}
        </div>

        <!-- Stone Tags -->
        <div class="product-info__stones" aria-label="Gemstones">
          ${product.stones.map(s => `<span class="stone-tag">${s}</span>`).join('')}
        </div>

        <!-- Description -->
        <div class="product-info__desc">
          <p class="body">${product.description}</p>
        </div>

        <!-- Details Table -->
        <div class="product-info__specs" aria-label="Product specifications">
          <table class="specs-table">
            <tbody>
              <tr><th scope="row">Material</th><td>${product.material}</td></tr>
              <tr><th scope="row">Purity</th><td>${product.purity}</td></tr>
              <tr><th scope="row">Weight</th><td>${product.weight}</td></tr>
              <tr><th scope="row">Stones</th><td>${product.stones.join(', ')}</td></tr>
              <tr><th scope="row">Occasions</th><td>${product.occasion.join(', ')}</td></tr>
              <tr><th scope="row">Availability</th><td><span class="availability ${product.inStock ? 'in-stock' : 'out-stock'}">${product.inStock ? '✓ Handcrafted on Order / In Stock' : '✗ Out of Stock'}</span></td></tr>
            </tbody>
          </table>
        </div>

        <!-- Features -->
        <ul class="product-features" aria-label="Product features">
          ${product.features.map(f => `
            <li class="product-feature">
              <span class="feature-icon text-gold" aria-hidden="true">✦</span>
              ${f}
            </li>
          `).join('')}
        </ul>

        <!-- Divider -->
        <div class="ornament" aria-hidden="true"><span></span></div>

        <!-- CTA -->
        <div class="product-cta" aria-label="Purchase options">
          ${isEnquire ? `
            <div style="display:flex;flex-direction:column;gap:var(--space-3);width:100%;">
              <button class="btn btn-primary btn-lg w-full" id="enquire-main-btn">
                Enquire for Price &amp; Private Viewing
              </button>
              <div style="display:flex;gap:var(--space-3);">
                <a 
                  href="https://wa.me/919876543210?text=${encodeURIComponent(`Hello AARANYA, I would like to enquire about the bespoke ${product.name}.`)}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-outline btn-lg" 
                  style="flex:1;color:var(--color-green-mid);border-color:var(--color-green-mid);display:flex;align-items:center;justify-content:center;gap:6px;"
                >
                  <span>💬</span> WhatsApp Specialist
                </a>
                <button class="btn btn-outline btn-lg" id="book-consult-btn" style="flex:1;">
                  <span>📅</span> Book Consultation
                </button>
              </div>
              <button 
                class="btn btn-ghost ${inWishlist ? 'active' : ''}"
                id="wishlist-btn"
                aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}"
                aria-pressed="${inWishlist}"
                style="margin-top:var(--space-2);width:100%;border:1px solid rgba(201,169,110,0.25);"
              >
                ${inWishlist ? '♥ In Wishlist' : '♡ Save to Wishlist'}
              </button>
            </div>
          ` : `
            <!-- Quantity -->
            <div class="qty-selector" aria-label="Quantity">
              <button class="qty-btn" id="qty-dec" aria-label="Decrease quantity">−</button>
              <span class="qty-display" id="qty-value" aria-live="polite" aria-atomic="true">1</span>
              <button class="qty-btn" id="qty-inc" aria-label="Increase quantity">+</button>
            </div>

            <!-- Action buttons -->
            <div class="cta-buttons">
              <button 
                class="btn btn-primary btn-lg w-full"
                id="add-to-cart-btn"
                ${!product.inStock ? 'disabled' : ''}
                aria-label="Add ${product.name} to shopping cart"
              >
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button 
                class="btn btn-dark btn-lg w-full"
                id="buy-now-btn"
                ${!product.inStock ? 'disabled' : ''}
              >
                Buy Now
              </button>
            </div>

            <!-- Wishlist & Enquire row -->
            <div class="cta-secondary">
              <button 
                class="btn btn-outline ${inWishlist ? 'active' : ''}"
                id="wishlist-btn"
                aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}"
                aria-pressed="${inWishlist}"
                style="flex:1;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="fill:${inWishlist ? 'var(--color-gold)' : 'none'};stroke:var(--color-gold);stroke-width:1.5;">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                ${inWishlist ? 'In Wishlist' : 'Save to Wishlist'}
              </button>
              <button class="btn btn-outline" id="enquire-btn" style="flex:1;">
                Enquire / WhatsApp
              </button>
            </div>
          `}
        </div>

        <!-- Trust badges -->
        <div class="product-trust" aria-label="Trust indicators">
          <div class="trust-item">
            <span class="trust-icon">🔒</span>
            <span>Secure Payment</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🚚</span>
            <span>Free Insured Delivery</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">↩</span>
            <span>30-Day Returns</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">🏅</span>
            <span>BIS Hallmarked</span>
          </div>
        </div>
      </section>
    </div>

    <!-- Related Products -->
    ${related.length > 0 ? `
      <section class="section bg-ivory-warm" aria-labelledby="related-heading">
        <div class="container">
          <h2 class="headline text-center reveal" id="related-heading" style="margin-bottom:var(--space-10);">You May Also Love</h2>
          <div class="products-grid related-grid" role="list" id="related-grid" aria-label="Related products">
            <!-- Injected by JS -->
          </div>
        </div>
      </section>
    ` : ''}
  `;

  // Wire breadcrumb links
  container.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  // Gallery thumbnails
  let currentQty = 1;
  const heroImg = container.querySelector('#gallery-hero');
  container.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      heroImg.style.opacity = '0';
      setTimeout(() => {
        heroImg.src = thumb.dataset.img;
        heroImg.style.opacity = '1';
      }, 200);
      container.querySelectorAll('.gallery-thumb').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      thumb.classList.add('active');
      thumb.setAttribute('aria-pressed', 'true');
    });
  });

  // Quantity controls
  const qtyDisplay = container.querySelector('#qty-value');
  container.querySelector('#qty-dec')?.addEventListener('click', () => {
    if (currentQty > 1) { currentQty--; qtyDisplay.textContent = currentQty; }
  });
  container.querySelector('#qty-inc')?.addEventListener('click', () => {
    currentQty++;
    qtyDisplay.textContent = currentQty;
  });

  // Add to cart
  container.querySelector('#add-to-cart-btn')?.addEventListener('click', () => {
    store.addToCart(product.id, currentQty);
    showToast(`${product.name} added to cart`, '✦');
    const btn = container.querySelector('#add-to-cart-btn');
    btn.textContent = '✓ Added to Cart';
    btn.style.background = 'var(--color-green-mid)';
    btn.style.borderColor = 'var(--color-green-mid)';
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 2000);
  });

  // Buy now
  container.querySelector('#buy-now-btn')?.addEventListener('click', () => {
    store.addToCart(product.id, currentQty);
    navigateFn('/cart');
  });

  // Wishlist
  const wishlistBtn = container.querySelector('#wishlist-btn');
  wishlistBtn?.addEventListener('click', () => {
    const added = store.toggleWishlist(product.id);
    wishlistBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="fill:${added ? 'var(--color-gold)' : 'none'};stroke:var(--color-gold);stroke-width:1.5;">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      ${added ? 'In Wishlist' : 'Save to Wishlist'}
    `;
    wishlistBtn.classList.toggle('active', added);
    wishlistBtn.setAttribute('aria-pressed', added);
    showToast(added ? 'Saved to Wishlist' : 'Removed from Wishlist', added ? '♥' : '♡');
  });

  // Enquire
  container.querySelector('#enquire-btn')?.addEventListener('click', () => {
    showEnquiryModal(product, navigateFn);
  });

  container.querySelector('#enquire-main-btn')?.addEventListener('click', () => {
    showEnquiryModal(product, navigateFn);
  });

  container.querySelector('#book-consult-btn')?.addEventListener('click', () => {
    navigateFn('/consultation');
  });

  // Related products
  const relatedGrid = container.querySelector('#related-grid');
  if (relatedGrid) {
    related.forEach(p => {
      const card = renderProductCard(p, navigateFn);
      card.setAttribute('role', 'listitem');
      relatedGrid.appendChild(card);
    });
  }

  setTimeout(() => {
    initScrollReveal();
    initLazyImages();
  }, 50);
}

function showEnquiryModal(product, navigateFn) {
  createModal({
    title: `Enquire: ${product.name}`,
    content: `
      <p class="body text-stone" style="margin-bottom:var(--space-6);">
        Our jewellery specialists will respond within 24 hours with personalised assistance, 
        sizing guidance, and custom order options.
      </p>
      <form id="enquiry-form" aria-label="Product enquiry form">
        <div style="display:grid;gap:var(--space-4);">
          <div class="form-group">
            <label class="form-label" for="enq-name">Full Name *</label>
            <input type="text" id="enq-name" class="form-input" placeholder="Your name" required autocomplete="name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="enq-phone">Phone Number *</label>
            <input type="tel" id="enq-phone" class="form-input" placeholder="+91 98765 43210" required autocomplete="tel" />
          </div>
          <div class="form-group">
            <label class="form-label" for="enq-email">Email Address</label>
            <input type="email" id="enq-email" class="form-input" placeholder="you@example.com" autocomplete="email" />
          </div>
          <div class="form-group">
            <label class="form-label" for="enq-message">Your Message</label>
            <textarea id="enq-message" class="form-input" rows="3" placeholder="Any specific requirements, size, customisation…" style="resize:vertical;"></textarea>
          </div>
          <div style="padding:var(--space-3) var(--space-4);background:var(--color-cream);border-radius:var(--radius-sm);">
            <p style="font-size:var(--text-xs);color:var(--color-stone);">Enquiring about: <strong>${product.name}</strong> — ${formatPrice(product.price)}</p>
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-full" id="enquiry-submit">Send Enquiry</button>
        </div>
      </form>
    `,
  });

  document.getElementById('enquiry-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('enq-name')?.value;
    if (name) {
      document.querySelector('.modal-overlay')?.classList.remove('open');
      showToast(`Thank you ${name}! We'll be in touch within 24 hours.`, '✉', 5000);
      setTimeout(() => document.querySelector('.modal-overlay')?.remove(), 400);
    }
  });
}

function renderDetailStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return `
    <span class="stars-filled" aria-hidden="true">${'★'.repeat(full)}${half ? '½' : ''}</span>
    <span class="stars-empty" aria-hidden="true">${'☆'.repeat(empty)}</span>
    <span class="rating-num">${rating}</span>
  `;
}

function getBadgeClass(badge) {
  const map = { 'Bestseller': 'badge-gold', 'New': 'badge-new', 'Sale': 'badge-burgundy', 'Premium': 'badge-gold', 'Exclusive': 'badge-gold' };
  return map[badge] || 'badge-gold';
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getProductDetailStyles() {
  return `
.breadcrumb { padding-bottom: var(--space-6); }
.breadcrumb__list { display:flex; align-items:center; flex-wrap:wrap; gap:var(--space-2); }
.breadcrumb__link { font-size:var(--text-sm); color:var(--color-stone); transition:color var(--transition-fast); }
.breadcrumb__link:hover { color:var(--color-gold); }
.breadcrumb__sep { color:var(--color-stone-light); font-size:var(--text-sm); }
.breadcrumb__current { font-size:var(--text-sm); color:var(--color-charcoal); font-weight:500; }

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: start;
}

/* Gallery */
.product-gallery { position: sticky; top: 90px; }
.gallery-main {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-cream);
  aspect-ratio: 3/4;
}
.gallery-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s ease;
}
.gallery-badge { position:absolute;top:var(--space-4);left:var(--space-4); }
.gallery-discount { position:absolute;top:var(--space-4);right:var(--space-4); }
.gallery-thumbs {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
.gallery-thumb {
  width: 70px;
  height: 85px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color var(--transition-fast), transform var(--transition-fast);
  cursor: pointer;
  flex-shrink: 0;
}
.gallery-thumb:hover { transform: translateY(-2px); }
.gallery-thumb.active { border-color: var(--color-gold); }
.gallery-thumb img { width:100%; height:100%; object-fit:cover; }

/* Product Info */
.product-info {}
.product-info__header { margin-bottom: var(--space-5); }
.product-info__meta { display:flex; gap:var(--space-2); align-items:center; }
.product-info__category {
  font-size:var(--text-xs);
  font-weight:600;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:var(--color-gold);
}
.product-info__purity {
  font-size:var(--text-xs);
  color:var(--color-stone);
  letter-spacing:0.08em;
}
.product-info__rating { display:flex; align-items:center; gap:var(--space-3); margin-top:var(--space-3); flex-wrap:wrap; }
.rating-stars { display:flex; align-items:center; gap:var(--space-1); }
.stars-filled { color:var(--color-gold); letter-spacing:2px; }
.stars-empty  { color:var(--color-cream); letter-spacing:2px; }
.rating-num   { font-family:var(--font-serif); font-size:var(--text-lg); font-weight:600; color:var(--color-charcoal); }
.rating-count { font-size:var(--text-sm); color:var(--color-stone); }
.rating-link  { font-size:var(--text-sm); color:var(--color-gold); text-decoration:underline; cursor:pointer; }

.product-info__pricing { margin:var(--space-6) 0; }
.price-display { display:flex; align-items:baseline; gap:var(--space-3); flex-wrap:wrap; }
.price-current {
  font-family:var(--font-serif);
  font-size:var(--text-4xl);
  font-weight:600;
  color:var(--color-charcoal);
  line-height:1;
}
.price-original { font-size:var(--text-xl); color:var(--color-stone-light); text-decoration:line-through; }
.price-note { font-size:var(--text-xs); color:var(--color-stone); margin-top:var(--space-2); letter-spacing:0.05em; }

.product-info__stones { display:flex; flex-wrap:wrap; gap:var(--space-2); margin-bottom:var(--space-5); }
.stone-tag {
  padding: var(--space-1) var(--space-3);
  background:var(--color-cream);
  border-radius:var(--radius-full);
  font-size:var(--text-xs);
  color:var(--color-charcoal);
  font-weight:500;
  letter-spacing:0.05em;
}

.product-info__desc { margin-bottom:var(--space-6); }
.product-info__specs { margin-bottom:var(--space-6); }
.specs-table { width:100%; border-collapse:collapse; }
.specs-table th {
  width:35%;
  text-align:left;
  padding:var(--space-2) var(--space-3) var(--space-2) 0;
  font-size:var(--text-sm);
  font-weight:600;
  color:var(--color-stone);
  border-bottom:1px solid var(--color-cream);
  vertical-align:top;
}
.specs-table td {
  padding:var(--space-2) 0;
  font-size:var(--text-sm);
  color:var(--color-charcoal);
  border-bottom:1px solid var(--color-cream);
}
.availability { font-weight:600; }
.availability.in-stock  { color:var(--color-green-mid); }
.availability.out-stock { color:var(--color-burgundy); }

.product-features { display:flex; flex-direction:column; gap:var(--space-2); margin-bottom:var(--space-6); }
.product-feature {
  display:flex;
  align-items:center;
  gap:var(--space-3);
  font-size:var(--text-sm);
  color:var(--color-charcoal);
}
.feature-icon { font-size:0.6rem; flex-shrink:0; }

.product-cta { margin-top:var(--space-6); display:flex; flex-direction:column; gap:var(--space-4); }
.qty-selector {
  display:inline-flex;
  align-items:center;
  border:1px solid rgba(122,111,98,0.3);
  border-radius:var(--radius-sm);
  overflow:hidden;
  width:fit-content;
}
.qty-btn {
  width:40px; height:40px;
  display:flex; align-items:center; justify-content:center;
  font-size:1.2rem;
  color:var(--color-charcoal);
  transition:background var(--transition-fast);
  cursor:pointer;
}
.qty-btn:hover { background:var(--color-cream); }
.qty-display {
  width:44px;
  text-align:center;
  font-family:var(--font-serif);
  font-size:var(--text-lg);
  font-weight:600;
  color:var(--color-charcoal);
  border-left:1px solid rgba(122,111,98,0.2);
  border-right:1px solid rgba(122,111,98,0.2);
}
.cta-buttons { display:flex; gap:var(--space-3); }
.cta-secondary { display:flex; gap:var(--space-3); }

.product-trust {
  display:flex;
  flex-wrap:wrap;
  gap:var(--space-5);
  padding:var(--space-5);
  background:var(--color-cream);
  border-radius:var(--radius-md);
  margin-top:var(--space-2);
}
.trust-item {
  display:flex;
  align-items:center;
  gap:var(--space-2);
  font-size:var(--text-xs);
  color:var(--color-charcoal);
  font-weight:500;
  letter-spacing:0.05em;
}
.trust-icon { font-size:1rem; }

.related-grid { grid-template-columns:repeat(3,1fr); }

@media (max-width:1024px) {
  .product-detail { grid-template-columns:1fr; gap:var(--space-8); }
  .product-gallery { position:static; }
  .gallery-main { max-height:500px; }
  .cta-buttons { flex-direction:column; }
}
@media (max-width:640px) {
  .cta-secondary { flex-direction:column; }
  .related-grid { grid-template-columns:repeat(2,1fr); }
  .product-trust { gap:var(--space-3); }
}
`;
}
