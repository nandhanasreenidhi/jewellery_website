// =========================================================
//  AARANYA — Cart Page
// =========================================================

import { store, PRODUCTS, formatPrice } from '../data.js';
import { showToast } from '../utils.js';

export function renderCart(container, navigateFn) {
  const renderCartContent = () => {
    const items = store.cart.map(item => {
      const p = PRODUCTS.find(p => p.id === item.id);
      return p ? { ...item, product: p } : null;
    }).filter(Boolean);

    const total = store.cartTotal();
    const shipping = total > 50000 ? 0 : 500;
    const grandTotal = total + shipping;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="cart-page container section" style="padding-top:calc(var(--space-20) + 60px);">
          <h1 class="headline" style="margin-bottom:var(--space-4);">Shopping Cart</h1>
          <div class="cart-empty">
            <div class="cart-empty__icon" aria-hidden="true">○</div>
            <h2 class="title">Your cart is empty</h2>
            <p class="body text-stone" style="margin:var(--space-4) 0;">Discover our exquisite jewellery collections and add your favourites.</p>
            <a href="/collections" class="btn btn-primary btn-lg" data-link>Explore Collections</a>
          </div>
        </div>
      `;
      container.querySelector('[data-link]')?.addEventListener('click', e => {
        e.preventDefault();
        navigateFn('/collections');
      });
      return;
    }

    container.innerHTML = `
      <div class="cart-page container" style="padding-top:calc(var(--space-16) + 60px);padding-bottom:var(--space-16);">
        <h1 class="headline" style="margin-bottom:var(--space-10);">
          Shopping Cart <span style="font-size:var(--text-2xl);color:var(--color-stone);">(${items.length} item${items.length !== 1 ? 's' : ''})</span>
        </h1>
        
        <div class="cart-layout">
          <!-- Cart Items -->
          <div class="cart-items" role="list" aria-label="Cart items">
            ${items.map(item => `
              <article class="cart-item" role="listitem" data-cart-item="${item.id}">
                <div class="cart-item__image">
                  <img src="${item.product.image}" alt="${item.product.name}" loading="lazy" width="120" height="150" style="object-fit:cover;width:100%;height:100%;border-radius:var(--radius-sm);" />
                </div>
                <div class="cart-item__body">
                  <div class="cart-item__header">
                    <div>
                      <p class="cart-item__material">${item.product.material}</p>
                      <h3 class="cart-item__name">
                        <a href="/product/${item.product.slug}" data-link>${item.product.name}</a>
                      </h3>
                      <p class="cart-item__detail">${item.product.purity} · ${item.product.weight}</p>
                    </div>
                    <button class="cart-item__remove" data-remove="${item.id}" aria-label="Remove ${item.product.name} from cart">
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>
                    </button>
                  </div>
                  <div class="cart-item__footer">
                    <div class="qty-selector" style="transform:scale(0.9);transform-origin:left;">
                      <button class="qty-btn" data-qty-dec="${item.id}" aria-label="Decrease quantity">−</button>
                      <span class="qty-display" id="qty-${item.id}">${item.qty}</span>
                      <button class="qty-btn" data-qty-inc="${item.id}" aria-label="Increase quantity">+</button>
                    </div>
                    <span class="cart-item__price">${formatPrice(item.product.price * item.qty)}</span>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>

          <!-- Order Summary -->
          <aside class="cart-summary" aria-label="Order summary">
            <div class="summary-card">
              <h2 class="title" style="margin-bottom:var(--space-6);font-size:1.4rem;">Order Summary</h2>
              
              <div class="summary-rows">
                <div class="summary-row">
                  <span>Subtotal (${items.length} item${items.length !== 1 ? 's' : ''})</span>
                  <span>${formatPrice(total)}</span>
                </div>
                <div class="summary-row">
                  <span>Shipping</span>
                  <span style="color:${shipping === 0 ? 'var(--color-green-mid)' : 'inherit'}">
                    ${shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                ${shipping > 0 ? `
                  <div class="summary-free-ship">
                    <p>Add ${formatPrice(50000 - total)} more for free shipping</p>
                    <div class="free-ship-bar">
                      <div class="free-ship-progress" style="width:${Math.min(100, (total / 50000) * 100)}%;"></div>
                    </div>
                  </div>
                ` : ''}
                <div class="summary-row summary-total">
                  <span>Total</span>
                  <span>${formatPrice(grandTotal)}</span>
                </div>
                <p class="summary-tax">Inclusive of all taxes. GST invoice will be provided.</p>
              </div>

              <button class="btn btn-primary btn-lg w-full" id="checkout-btn" style="margin-top:var(--space-5);">
                Proceed to Checkout
              </button>
              <a href="/collections" class="btn btn-outline w-full" style="margin-top:var(--space-3);" data-link>
                Continue Shopping
              </a>

              <div class="summary-secure" aria-label="Security assurances">
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>
                <span>Secure &amp; Encrypted Payment</span>
              </div>
            </div>

            <!-- Promo code -->
            <div class="promo-code">
              <h3 style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-3);">Have a promo code?</h3>
              <div class="promo-input-wrap">
                <input type="text" class="form-input" id="promo-input" placeholder="Enter code" aria-label="Promo code" />
                <button class="btn btn-dark btn-sm" id="apply-promo">Apply</button>
              </div>
            </div>

            <!-- Delivery info -->
            <div class="delivery-info">
              <div class="delivery-item">
                <span>🚚</span>
                <div>
                  <p style="font-size:var(--text-sm);font-weight:600;">Free insured shipping on orders above ₹50,000</p>
                  <p class="body-sm text-stone">Estimated delivery: 5–7 business days</p>
                </div>
              </div>
              <div class="delivery-item">
                <span>↩</span>
                <div>
                  <p style="font-size:var(--text-sm);font-weight:600;">30-day hassle-free returns</p>
                  <p class="body-sm text-stone">Unworn pieces returned for a full refund</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;

    // Event bindings
    container.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        navigateFn(link.getAttribute('href'));
      });
    });

    container.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.remove;
        const product = PRODUCTS.find(p => p.id === id);
        store.removeFromCart(id);
        showToast(`${product?.name} removed from cart`, '✕');
        renderCartContent(); // re-render
      });
    });

    container.querySelectorAll('[data-qty-dec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.qtyDec;
        const item = store.cart.find(i => i.id === id);
        if (item) {
          if (item.qty <= 1) {
            store.removeFromCart(id);
          } else {
            store.updateCartQty(id, item.qty - 1);
          }
          renderCartContent();
        }
      });
    });

    container.querySelectorAll('[data-qty-inc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.qtyInc;
        const item = store.cart.find(i => i.id === id);
        if (item) {
          store.updateCartQty(id, item.qty + 1);
          renderCartContent();
        }
      });
    });

    container.querySelector('#checkout-btn')?.addEventListener('click', () => {
      showToast('Checkout coming soon! Please contact us to complete your order.', '✦', 5000);
    });

    container.querySelector('#apply-promo')?.addEventListener('click', () => {
      const code = container.querySelector('#promo-input')?.value.trim().toUpperCase();
      if (code === 'AARANYA10') {
        showToast('Promo code applied! 10% discount added.', '✦', 4000);
      } else {
        showToast('Invalid promo code. Please try again.', '✕');
      }
    });
  };

  renderCartContent();
}

export function getCartStyles() {
  return `
.cart-empty { 
  text-align:center; padding:var(--space-20) var(--space-8);
  max-width:400px; margin:0 auto;
}
.cart-empty__icon {
  display:block; font-size:4rem; color:var(--color-gold);
  margin-bottom:var(--space-5); opacity:0.3;
}
.cart-layout {
  display:grid; grid-template-columns:1fr 380px; gap:var(--space-10); align-items:start;
}
.cart-items { display:flex; flex-direction:column; gap:var(--space-4); }
.cart-item {
  display:grid; grid-template-columns:120px 1fr;
  gap:var(--space-5); padding:var(--space-5);
  background:var(--color-white); border-radius:var(--radius-lg);
  box-shadow:var(--shadow-sm);
}
.cart-item__image { height:150px; overflow:hidden; border-radius:var(--radius-sm); background:var(--color-cream); }
.cart-item__body { display:flex; flex-direction:column; justify-content:space-between; }
.cart-item__header { display:flex; justify-content:space-between; align-items:flex-start; }
.cart-item__material { font-size:var(--text-xs); color:var(--color-gold); text-transform:uppercase; letter-spacing:0.1em; font-weight:500; }
.cart-item__name a {
  font-family:var(--font-serif); font-size:var(--text-xl); color:var(--color-charcoal);
  font-weight:500; line-height:1.2;
  transition:color var(--transition-fast); display:block; margin:var(--space-1) 0;
}
.cart-item__name a:hover { color:var(--color-gold-deep); }
.cart-item__detail { font-size:var(--text-xs); color:var(--color-stone); }
.cart-item__remove { color:var(--color-stone); transition:color var(--transition-fast); padding:var(--space-1); }
.cart-item__remove:hover { color:var(--color-burgundy); }
.cart-item__remove svg { stroke:currentColor; }
.cart-item__footer { display:flex; align-items:center; justify-content:space-between; }
.cart-item__price { font-family:var(--font-serif); font-size:var(--text-xl); font-weight:600; color:var(--color-charcoal); }

.summary-card {
  background:var(--color-white); border-radius:var(--radius-lg);
  padding:var(--space-6); box-shadow:var(--shadow-sm);
}
.summary-rows { display:flex; flex-direction:column; gap:var(--space-3); }
.summary-row { display:flex; justify-content:space-between; font-size:var(--text-sm); }
.summary-total {
  font-size:var(--text-lg); font-weight:700;
  padding-top:var(--space-3); margin-top:var(--space-2);
  border-top:2px solid var(--color-cream);
  font-family:var(--font-serif);
}
.summary-tax { font-size:var(--text-xs); color:var(--color-stone); }
.summary-free-ship { padding:var(--space-3); background:var(--color-cream); border-radius:var(--radius-sm); }
.summary-free-ship p { font-size:var(--text-xs); color:var(--color-stone); margin-bottom:var(--space-2); }
.free-ship-bar { height:3px; background:rgba(201,169,110,0.2); border-radius:var(--radius-full); overflow:hidden; }
.free-ship-progress { height:100%; background:var(--color-gold); border-radius:var(--radius-full); transition:width 0.5s ease; }
.summary-secure { display:flex; align-items:center; gap:var(--space-2); font-size:var(--text-xs); color:var(--color-stone); margin-top:var(--space-4); justify-content:center; }
.summary-secure svg { stroke:var(--color-green-mid); flex-shrink:0; }

.promo-code {
  background:var(--color-white); border-radius:var(--radius-lg);
  padding:var(--space-5); box-shadow:var(--shadow-sm); margin-top:var(--space-4);
}
.promo-input-wrap { display:flex; gap:var(--space-2); }

.delivery-info {
  display:flex; flex-direction:column; gap:var(--space-4);
  padding:var(--space-5); background:var(--color-white);
  border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); margin-top:var(--space-4);
}
.delivery-item { display:flex; gap:var(--space-3); align-items:flex-start; font-size:1.2rem; }

@media (max-width:900px) {
  .cart-layout { grid-template-columns:1fr; }
}
@media (max-width:600px) {
  .cart-item { grid-template-columns:90px 1fr; gap:var(--space-3); }
  .cart-item__image { height:110px; }
}
`;
}
