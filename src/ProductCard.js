// =========================================================
//  AARANYA — Product Card Component
// =========================================================

import { store, formatPrice } from './data.js';
import { showToast, createModal } from './utils.js';

export function renderProductCard(product, navigateFn) {
  const inWishlist = store.isInWishlist(product.id);
  const isEnquire = product.isEnquireOnly || product.price === null;
  const discount = product.originalPrice && product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const card = document.createElement('article');
  card.className = 'product-card reveal';
  card.setAttribute('data-product-id', product.id);
  card.setAttribute('aria-label', product.name);

  card.innerHTML = `
    <div class="product-card__image-wrap">
      <a href="/product/${product.slug}" class="product-card__image-link" data-link aria-label="View ${product.name}">
        <img
          data-src="${product.image}"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 4'%3E%3C/svg%3E"
          alt="${product.name} — ${product.material} ${product.category}"
          class="product-card__img img-cover"
          loading="lazy"
          width="400"
          height="533"
        />
        <div class="product-card__overlay" aria-hidden="true">
          <button class="product-card__quick-view btn btn-ghost btn-sm" data-quick-view>
            Quick View
          </button>
        </div>
      </a>

      <!-- Wishlist button -->
      <button 
        class="product-card__wishlist ${inWishlist ? 'active' : ''}"
        data-wishlist-btn
        aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}"
        aria-pressed="${inWishlist}"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      <!-- Badges -->
      <div class="product-card__badges" aria-label="Product labels">
        ${product.badge ? `<span class="badge ${getBadgeClass(product.badge)}">${product.badge}</span>` : ''}
        ${discount ? `<span class="badge badge-burgundy">-${discount}%</span>` : ''}
      </div>
    </div>

    <div class="product-card__body">
      <div class="product-card__meta">
        <span class="product-card__material">${product.material}</span>
        <div class="product-card__rating" aria-label="Rated ${product.rating} out of 5">
          <span class="product-card__stars" aria-hidden="true">${renderStars(product.rating)}</span>
          <span class="product-card__reviews">(${product.reviews})</span>
        </div>
      </div>

      <a href="/product/${product.slug}" class="product-card__name" data-link>
        <h3>${product.name}</h3>
      </a>

      <div class="product-card__stones">
        ${product.stones.slice(0, 3).map(s => `<span class="product-card__stone">${s}</span>`).join('')}
      </div>

      <div class="product-card__price-row">
        <div class="product-card__prices">
          <span class="product-card__price ${isEnquire ? 'text-gold' : ''}" style="${isEnquire ? 'font-size:1.05rem;font-weight:600;' : ''}">
            ${formatPrice(product.price)}
          </span>
          ${product.originalPrice ? `<span class="product-card__original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        ${isEnquire ? `
          <button 
            class="product-card__add-btn btn btn-outline btn-sm"
            data-enquire-card
            aria-label="Enquire for price of ${product.name}"
            style="color:var(--color-gold);border-color:var(--color-gold);"
          >
            Enquire
          </button>
        ` : `
          <button 
            class="product-card__add-btn btn btn-primary btn-sm"
            data-add-cart
            aria-label="Add ${product.name} to cart"
          >
            Add to Cart
          </button>
        `}
      </div>
    </div>
  `;

  // Event bindings
  // SPA navigation
  card.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  // Wishlist toggle
  const wishlistBtn = card.querySelector('[data-wishlist-btn]');
  wishlistBtn.addEventListener('click', e => {
    e.stopPropagation();
    const added = store.toggleWishlist(product.id);
    wishlistBtn.classList.toggle('active', added);
    wishlistBtn.setAttribute('aria-pressed', added);
    wishlistBtn.setAttribute('aria-label', added ? 'Remove from wishlist' : 'Add to wishlist');
    showToast(
      added ? `Added to Wishlist` : 'Removed from Wishlist',
      added ? '♥' : '♡'
    );
  });

  // Add to cart (for non-enquire pieces)
  const addCartBtn = card.querySelector('[data-add-cart]');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', e => {
      e.stopPropagation();
      const success = store.addToCart(product.id, 1);
      if (success) {
        showToast(`${product.name} added to cart`, '✦');
        addCartBtn.textContent = '✓ Added';
        addCartBtn.style.background = 'var(--color-green-mid)';
        addCartBtn.style.borderColor = 'var(--color-green-mid)';
        setTimeout(() => {
          addCartBtn.textContent = 'Add to Cart';
          addCartBtn.style.background = '';
          addCartBtn.style.borderColor = '';
        }, 1500);
      }
    });
  }

  // Enquire button (for bespoke / high-value pieces)
  const enquireBtn = card.querySelector('[data-enquire-card]');
  if (enquireBtn) {
    enquireBtn.addEventListener('click', e => {
      e.stopPropagation();
      openEnquiryModal(product, navigateFn);
    });
  }

  // Quick view
  card.querySelector('[data-quick-view]')?.addEventListener('click', e => {
    e.stopPropagation();
    e.preventDefault();
    showQuickView(product, navigateFn);
  });

  return card;
}

function getBadgeClass(badge) {
  const map = {
    'Bestseller': 'badge-gold',
    'New': 'badge-new',
    'Sale': 'badge-burgundy',
    'Premium': 'badge-gold',
    'Exclusive': 'badge-gold',
    'High Value Heirloom': 'badge-burgundy',
    'Bespoke Masterpiece': 'badge-gold',
    'Men\'s Line': 'badge-gold',
    'Auspicious Gift': 'badge-gold',
  };
  return map[badge] || 'badge-gold';
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
}

function showQuickView(product, navigateFn) {
  const isEnquire = product.isEnquireOnly || product.price === null;
  const inWishlist = store.isInWishlist(product.id);
  const discount = product.originalPrice && product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const description = product.description || 'Discover this exquisite AARANYA jewellery creation.';
  const isLongDescription = description.length > 180;
  const shortDescription = isLongDescription
    ? description.slice(0, 180).trimEnd() + '…'
    : description;

  const { closeModal } = createModal({
    title: product.name,
    content: `
      <div class="qv-luxury">
        <div class="qv-luxury__gallery">
          <div class="qv-luxury__image-frame">
            <img
              class="qv-luxury__image"
              src="${product.image}"
              alt="${product.name} — ${product.material} jewellery"
              loading="eager"
            />
            ${product.badge ? `
              <span class="qv-luxury__badge">${product.badge}</span>
            ` : ''}
            <span class="qv-luxury__image-caption">THE AARANYA COLLECTION</span>
          </div>
        </div>

        <div class="qv-luxury__details">
          <p class="qv-luxury__eyebrow">
            ${product.material || 'Fine Jewellery'}
            ${product.purity ? ` <span>·</span> ${product.purity}` : ''}
          </p>

          <h2 class="qv-luxury__title">${product.name}</h2>

          <div class="qv-luxury__rating">
            <span class="qv-luxury__stars" aria-label="${product.rating || 0} out of 5 stars">
              ${'★'.repeat(Math.max(0, Math.min(5, Math.floor(product.rating || 0))))}${'☆'.repeat(5 - Math.max(0, Math.min(5, Math.floor(product.rating || 0))))}
            </span>
            <span>${product.reviews ?? 0} reviews</span>
          </div>

          <div class="qv-luxury__price">
            <span class="qv-luxury__price-current">
              ${isEnquire ? 'Price on Request' : formatPrice(product.price)}
            </span>
            ${product.originalPrice && !isEnquire ? `
              <span class="qv-luxury__price-original">
                ${formatPrice(product.originalPrice)}
              </span>
            ` : ''}
            ${discount ? `
              <span class="qv-luxury__discount">${discount}% OFF</span>
            ` : ''}
          </div>

          <div class="qv-luxury__rule">
            <span>✦</span>
          </div>

          <p class="qv-luxury__description">${shortDescription}</p>

          ${product.stones?.length ? `
            <div class="qv-luxury__section">
              <p class="qv-luxury__label">DETAILS THAT MATTER</p>
              <div class="qv-luxury__tags">
                ${product.stones.map(stone => `
                  <span class="qv-luxury__tag">${stone}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="qv-luxury__specs">
            ${product.material ? `
              <div class="qv-luxury__spec">
                <span>Material</span>
                <strong>${product.material}</strong>
              </div>
            ` : ''}
            ${product.purity ? `
              <div class="qv-luxury__spec">
                <span>Purity</span>
                <strong>${product.purity}</strong>
              </div>
            ` : ''}
            ${product.weight ? `
              <div class="qv-luxury__spec">
                <span>Weight</span>
                <strong>${product.weight}</strong>
              </div>
            ` : ''}
            ${typeof product.inStock === 'boolean' ? `
              <div class="qv-luxury__spec">
                <span>Availability</span>
                <strong class="${product.inStock ? 'qv-luxury__available' : 'qv-luxury__unavailable'}">
                  ${product.inStock ? 'Available' : 'Currently unavailable'}
                </strong>
              </div>
            ` : ''}
          </div>

          <div class="qv-luxury__actions">
            ${isEnquire ? `
              <button class="qv-luxury__primary" id="qv-enquire-btn">
                Enquire About This Piece
                <span aria-hidden="true">↗</span>
              </button>
            ` : `
              <button
                class="qv-luxury__primary"
                id="qv-add-cart"
                ${product.inStock === false ? 'disabled' : ''}
              >
                ${product.inStock === false ? 'Currently Unavailable' : 'Add to Cart'}
                <span aria-hidden="true">→</span>
              </button>
            `}

            <button
              class="qv-luxury__wishlist ${inWishlist ? 'is-saved' : ''}"
              id="qv-wishlist-btn"
              aria-pressed="${inWishlist}"
            >
              <span class="qv-luxury__heart" aria-hidden="true">${inWishlist ? '♥' : '♡'}</span>
              <span>${inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
            </button>

            <button class="qv-luxury__details-link" id="qv-view-details">
              Discover the Full Piece <span aria-hidden="true">↗</span>
            </button>
          </div>

          <p class="qv-luxury__note">
            <span aria-hidden="true">✧</span>
            Thoughtfully selected. Timelessly treasured.
          </p>
        </div>
      </div>
    `,
  });

  // Add the Quick View styles only once.
  if (!document.getElementById('qv-luxury-styles')) {
    const style = document.createElement('style');
    style.id = 'qv-luxury-styles';
    style.textContent = `
      .qv-luxury {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
        gap: 30px;
        align-items: start;
        color: #29251f;
      }

      .qv-luxury__gallery { min-width: 0; }

      .qv-luxury__image-frame {
        position: relative;
        overflow: hidden;
        background: #f5f0e7;
        aspect-ratio: 4 / 5;
      }

      .qv-luxury__image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 500ms ease;
      }

      .qv-luxury__image-frame:hover .qv-luxury__image {
        transform: scale(1.035);
      }

      .qv-luxury__badge {
        position: absolute;
        top: 14px;
        left: 14px;
        padding: 7px 11px;
        background: rgba(250, 248, 243, 0.95);
        color: #987744;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .qv-luxury__image-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px 12px 12px;
        color: #fff;
        background: linear-gradient(transparent, rgba(30, 24, 18, 0.45));
        font-size: 9px;
        letter-spacing: 0.2em;
        text-align: center;
      }

      .qv-luxury__details {
        min-width: 0;
        padding: 4px 0;
      }

      .qv-luxury__eyebrow {
        margin: 0 0 12px;
        color: #a58a5b;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.17em;
        line-height: 1.7;
        text-transform: uppercase;
      }

      .qv-luxury__eyebrow span { color: #c4b28f; }

      .qv-luxury__title {
        margin: 0;
        color: #29251f;
        font-family: var(--font-serif, Georgia, serif);
        font-size: clamp(24px, 2.3vw, 35px);
        font-weight: 400;
        line-height: 1.2;
        overflow-wrap: anywhere;
      }

      .qv-luxury__rating {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 9px;
        margin-top: 13px;
        color: #898174;
        font-size: 11px;
      }

      .qv-luxury__stars {
        color: #b89b62;
        letter-spacing: 2px;
      }

      .qv-luxury__price {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        margin-top: 23px;
      }

      .qv-luxury__price-current {
        color: #302a22;
        font-family: var(--font-serif, Georgia, serif);
        font-size: clamp(21px, 2vw, 27px);
        line-height: 1.25;
      }

      .qv-luxury__price-original {
        color: #a39a8c;
        font-size: 13px;
        text-decoration: line-through;
      }

      .qv-luxury__discount {
        padding: 5px 7px;
        border: 1px solid #e1d2b5;
        color: #987744;
        font-size: 9px;
        letter-spacing: 0.08em;
      }

      .qv-luxury__rule {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 20px 0;
        color: #b89b62;
        font-size: 12px;
      }

      .qv-luxury__rule::before,
      .qv-luxury__rule::after {
        content: "";
        height: 1px;
        background: #e9e1d4;
      }

      .qv-luxury__rule::before { width: 28px; }
      .qv-luxury__rule::after { flex: 1; }

      .qv-luxury__description {
        margin: 0 0 20px;
        color: #777064;
        font-size: 13px;
        line-height: 1.85;
      }

      .qv-luxury__section { margin-bottom: 19px; }

      .qv-luxury__label {
        margin: 0 0 10px;
        color: #8e7a58;
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.16em;
      }

      .qv-luxury__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
      }

      .qv-luxury__tag {
        padding: 7px 10px;
        border: 1px solid #e8dfd0;
        color: #5f5546;
        font-size: 11px;
      }

      .qv-luxury__specs {
        margin: 0 0 22px;
        border-top: 1px solid #ece5d9;
      }

      .qv-luxury__spec {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid #ece5d9;
        font-size: 11px;
      }

      .qv-luxury__spec > span { color: #898174; }

      .qv-luxury__spec strong {
        color: #393229;
        font-weight: 500;
        text-align: right;
        overflow-wrap: anywhere;
      }

      .qv-luxury__spec .qv-luxury__available { color: #54765a; }
      .qv-luxury__spec .qv-luxury__unavailable { color: #94554d; }

      .qv-luxury__actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .qv-luxury__primary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        min-height: 49px;
        padding: 13px 17px;
        border: 1px solid #a58a5b;
        background: #a58a5b;
        color: #fffdf8;
        font-family: inherit;
        font-size: 12px;
        letter-spacing: 0.045em;
        cursor: pointer;
        transition: background 180ms ease, border-color 180ms ease;
      }

      .qv-luxury__primary:hover:not(:disabled) {
        background: #8e744a;
        border-color: #8e744a;
      }

      .qv-luxury__primary:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .qv-luxury__primary span { font-size: 17px; }

      .qv-luxury__wishlist {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 9px;
        min-height: 43px;
        padding: 10px;
        border: 1px solid #e7dfd2;
        background: transparent;
        color: #655b4c;
        font-family: inherit;
        font-size: 12px;
        cursor: pointer;
        transition: border-color 180ms ease, color 180ms ease;
      }

      .qv-luxury__wishlist:hover,
      .qv-luxury__wishlist.is-saved {
        border-color: #b89b62;
        color: #987744;
      }

      .qv-luxury__heart { font-size: 18px; }

      .qv-luxury__details-link {
        align-self: center;
        padding: 8px 5px;
        border: 0;
        border-bottom: 1px solid #c9b58f;
        background: transparent;
        color: #625541;
        font-family: inherit;
        font-size: 11px;
        letter-spacing: 0.045em;
        cursor: pointer;
      }

      .qv-luxury__details-link span { margin-left: 5px; }

      .qv-luxury__note {
        margin: 19px 0 0;
        color: #998d79;
        font-family: var(--font-serif, Georgia, serif);
        font-size: 12px;
        font-style: italic;
        text-align: center;
      }

      .qv-luxury__note span {
        margin-right: 5px;
        color: #b89b62;
      }

      .qv-luxury button:focus-visible {
        outline: 2px solid #a58a5b;
        outline-offset: 3px;
      }

      @media (max-width: 650px) {
        .qv-luxury {
          grid-template-columns: minmax(0, 1fr);
          gap: 22px;
        }

        .qv-luxury__image-frame {
          aspect-ratio: 5 / 4;
          max-height: 330px;
        }

        .qv-luxury__details { padding: 0 2px 4px; }
        .qv-luxury__title { font-size: 27px; }
        .qv-luxury__price { margin-top: 16px; }
        .qv-luxury__rule { margin: 15px 0; }
      }

      @media (prefers-reduced-motion: reduce) {
        .qv-luxury__image,
        .qv-luxury__primary,
        .qv-luxury__wishlist {
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add to cart
  document.getElementById('qv-add-cart')?.addEventListener('click', () => {
    if (product.inStock === false) return;

    const success = store.addToCart(product.id, 1);

    if (success) {
      showToast(`${product.name} added to cart`, '✦');

      const btn = document.getElementById('qv-add-cart');
      if (btn) {
        btn.innerHTML = '✓ Added to Cart';
      }
    }
  });

  // Wishlist toggle
  document.getElementById('qv-wishlist-btn')?.addEventListener('click', e => {
    const btn = e.currentTarget;
    const added = store.toggleWishlist(product.id);

    btn.classList.toggle('is-saved', added);
    btn.setAttribute('aria-pressed', String(added));
    btn.innerHTML = `
      <span class="qv-luxury__heart" aria-hidden="true">${added ? '♥' : '♡'}</span>
      <span>${added ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
    `;

    showToast(
      added ? 'Added to Wishlist' : 'Removed from Wishlist',
      added ? '♥' : '♡'
    );
  });

  // Enquiry
  document.getElementById('qv-enquire-btn')?.addEventListener('click', () => {
    closeModal();
    openEnquiryModal(product, navigateFn);
  });

  // Full product details
  document.getElementById('qv-view-details')?.addEventListener('click', () => {
    closeModal();
    navigateFn(`/product/${product.slug}`);
  });
}

export function openEnquiryModal(product, navigateFn) {
  const isEnquire = product.isEnquireOnly || product.price === null;
  const priceLabel = isEnquire ? 'Price on Request' : formatPrice(product.price);
  const waMsg = encodeURIComponent(`Hello AARANYA, I would like to enquire about the ${product.name} (${product.material}, ${product.purity}). Please share pricing, availability, and private showing options.`);

  const { closeModal } = createModal({
    title: `Enquire: ${product.name}`,
    content: `
      <div style="margin-bottom:var(--space-5);">
        <p class="body text-stone" style="font-size:var(--text-sm);margin-bottom:var(--space-4);">
          ${isEnquire ? 'This heirloom creation is crafted to order. Connect directly with our Senior Jewellery Specialist in Jaipur for private viewings, bespoke modifications, and formal quotation.' : 'Our jewellery specialists will assist with sizing guidance, authentication certificates, and insured delivery options.'}
        </p>
        <div style="display:flex;align-items:center;gap:var(--space-4);padding:var(--space-4);background:var(--color-cream);border-radius:var(--radius-md);margin-bottom:var(--space-5);">
          <img src="${product.image}" alt="${product.name}" style="width:54px;height:54px;border-radius:var(--radius-sm);object-fit:cover;" />
          <div>
            <h4 style="font-family:var(--font-serif);font-size:var(--text-base);margin:0;">${product.name}</h4>
            <p style="font-size:var(--text-xs);color:var(--color-stone);margin-top:2px;">${product.material} · <strong style="color:var(--color-charcoal);">${priceLabel}</strong></p>
          </div>
        </div>

        <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-6);">
          <a href="https://wa.me/919876543210?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-md w-full" style="color:var(--color-green-mid);border-color:var(--color-green-mid);display:flex;align-items:center;justify-content:center;gap:8px;">
            <span style="font-size:1.1rem;">💬</span> WhatsApp Specialist
          </a>
          <a href="tel:+919876543210" class="btn btn-outline btn-md w-full" style="color:var(--color-charcoal);border-color:var(--color-charcoal);display:flex;align-items:center;justify-content:center;gap:8px;">
            <span>📞</span> Call +91 XXXXXXXXXX
          </a>
        </div>

        <div style="position:relative;text-align:center;margin:var(--space-4) 0 var(--space-5);">
          <span style="background:var(--color-white);padding:0 var(--space-3);color:var(--color-stone);font-size:var(--text-xs);letter-spacing:0.1em;text-transform:uppercase;">Or Request Specialist Callback</span>
          <div style="position:absolute;top:50%;left:0;right:0;height:1px;background:var(--color-cream);z-index:-1;"></div>
        </div>

        <form id="card-enquiry-form" style="display:grid;gap:var(--space-3);">
          <div>
            <label class="form-label" for="card-enq-name">Your Full Name *</label>
            <input type="text" id="card-enq-name" class="form-input" placeholder="Priya Sharma" required autocomplete="name" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
            <div>
              <label class="form-label" for="card-enq-phone">Phone / WhatsApp *</label>
              <input type="tel" id="card-enq-phone" class="form-input" placeholder="+91 XXXXXXXXXX" required autocomplete="tel" />
            </div>
            <div>
              <label class="form-label" for="card-enq-city">City</label>
              <input type="text" id="card-enq-city" class="form-input" placeholder="Jaipur / Mumbai" />
            </div>
          </div>
          <div>
            <label class="form-label" for="card-enq-notes">Specific Requests / Custom Sizing</label>
            <textarea id="card-enq-notes" class="form-input" rows="2" placeholder="e.g. Inquire about matching earrings, delivery timeline, or private viewing in Jaipur…"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-full" style="margin-top:var(--space-2);">
            Submit Enquiry Request
          </button>
          <p style="font-size:0.75rem;color:var(--color-stone);text-align:center;margin-top:4px;">
            Demo mode: request saved locally. Our team responds within 24 hours.
          </p>
        </form>
      </div>
    `,
  });

  document.getElementById('card-enquiry-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('card-enq-name')?.value;
    const phone = document.getElementById('card-enq-phone')?.value;
    if (name && phone) {
      closeModal();
      showToast(`Thank you ${name}! Our senior specialist will contact you on ${phone}.`, '✉', 6000);
    }
  });
}

