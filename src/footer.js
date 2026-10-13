// =========================================================
//  AARANYA — Footer Component
// =========================================================

export function renderFooter(navigateFn) {
  const existing = document.getElementById('site-footer');
  if (existing) existing.remove();

  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.setAttribute('role', 'contentinfo');
  footer.innerHTML = `
    <div class="footer-main bg-charcoal">
      <div class="container">
        <div class="footer-grid">
          
          <!-- Brand Column -->
          <div class="footer-brand">
            <a href="/" class="footer-logo" data-link aria-label="AARANYA home">
              <span class="footer-logo-text">AARANYA</span>
              <span class="footer-logo-sub">Modern Indian Luxury</span>
            </a>
            <p class="footer-desc">
              Handcrafted jewellery where centuries of Indian tradition meet contemporary luxury. 
              Every piece is a story — of craft, of family, of love.
            </p>
            <div class="footer-certifications" aria-label="Certifications and quality marks">
              <span class="cert-badge" title="BIS Bureau of Indian Standards Hallmark">🏅 BIS Hallmarked</span>
              <span class="cert-badge" title="GIA Gemological Institute of America">💎 GIA Certified</span>
              <span class="cert-badge" title="ISO 9001 Quality Management">✦ ISO 9001</span>
            </div>
            <div class="footer-social" aria-label="Follow us on social media">
              <a href="#" class="social-btn" aria-label="Follow AARANYA on Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" class="social-btn" aria-label="Follow AARANYA on Pinterest">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.140-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.135-1.867 3.135-4.562 0-2.387-1.716-4.057-4.164-4.057-2.838 0-4.503 2.129-4.503 4.33 0 .857.33 1.777.742 2.28.082.099.093.185.069.284-.076.313-.245.995-.278 1.134-.044.183-.147.221-.339.133-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              </a>
              <a href="#" class="social-btn" aria-label="Follow AARANYA on Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" class="social-btn" aria-label="Watch AARANYA on YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--color-charcoal)"/></svg>
              </a>
            </div>
          </div>

          <!-- Collections Column -->
          <nav class="footer-nav" aria-label="Collections navigation">
            <h3 class="footer-nav-title">Collections</h3>
            <ul>
              <li><a href="/collections?cat=necklaces" data-link>Necklaces</a></li>
              <li><a href="/collections?cat=rings" data-link>Rings</a></li>
              <li><a href="/collections?cat=earrings" data-link>Earrings</a></li>
              <li><a href="/collections?cat=bangles" data-link>Bangles</a></li>
              <li><a href="/collections?cat=bracelets" data-link>Bracelets</a></li>
              <li><a href="/collections?cat=pendants" data-link>Pendants</a></li>
              <li><a href="/collections?cat=bridal" data-link>Bridal Sets</a></li>
            </ul>
          </nav>

          <!-- Information Column -->
          <nav class="footer-nav" aria-label="Information navigation">
            <h3 class="footer-nav-title">Information</h3>
            <ul>
              <li><a href="/about" data-link>Our Story</a></li>
              <li><a href="/lookbook" data-link>Lookbook</a></li>
              <li><a href="/contact" data-link>Contact Us</a></li>
              <li><a href="#" aria-label="Care & Cleaning guide">Care &amp; Cleaning</a></li>
              <li><a href="#" aria-label="Custom jewellery orders">Bespoke Orders</a></li>
              <li><a href="#" aria-label="Sizing guide">Sizing Guide</a></li>
            </ul>
          </nav>

          <!-- Policies Column -->
          <nav class="footer-nav" aria-label="Policy navigation">
            <h3 class="footer-nav-title">Policies</h3>
            <ul>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns &amp; Exchange</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Hallmarking FAQ</a></li>
            </ul>
          </nav>

          <!-- Contact Column -->
          <div class="footer-contact">
            <h3 class="footer-nav-title">Contact</h3>
            <address class="footer-address">
              <p>
                <strong>AARANYA Jewellery House</strong><br/>
                Johri Bazaar, Jaipur<br/>
                Rajasthan 302 003, India
              </p>
              <p style="margin-top:var(--space-4);">
                <a href="tel:+919876543210">+91 98765 43210</a><br/>
                <a href="mailto:hello@aaranya.in">hello@aaranya.in</a>
              </p>
              <p style="margin-top:var(--space-3);font-size:var(--text-xs);color:rgba(250,247,242,0.4);font-style:normal;">
                Mon–Sat: 10am – 7pm IST<br/>
                Studio visits by appointment
              </p>
            </address>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom bg-charcoal">
      <div class="container">
        <div class="footer-bottom-inner">
          <p class="footer-copy">
            © ${new Date().getFullYear()} AARANYA Jewellery Pvt. Ltd. All rights reserved.
          </p>
          <div class="footer-payment" aria-label="Accepted payment methods">
            <span class="payment-badge" aria-label="Visa">VISA</span>
            <span class="payment-badge" aria-label="Mastercard">MC</span>
            <span class="payment-badge" aria-label="UPI">UPI</span>
            <span class="payment-badge" aria-label="Razorpay">Razorpay</span>
            <span class="payment-badge" aria-label="Net Banking">NetBank</span>
          </div>
          <p class="footer-made">
            Crafted with ♥ in India
          </p>
        </div>
      </div>
    </div>
  `;

  // SPA links
  footer.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  // Social links prevent default
  footer.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', e => e.preventDefault());
  });

  document.body.appendChild(footer);
}

export function getFooterStyles() {
  return `
.footer-main {
  padding: var(--space-16) 0 var(--space-10);
  border-top: 1px solid rgba(201,169,110,0.1);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: var(--space-8);
}
.footer-logo {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-4);
  text-decoration: none;
}
.footer-logo-text {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: var(--color-gold);
  line-height: 1;
}
.footer-logo-sub {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-stone-light);
  margin-top: 3px;
}
.footer-desc {
  font-size: var(--text-sm);
  color: rgba(250,247,242,0.5);
  line-height: 1.7;
  margin-bottom: var(--space-5);
}
.footer-certifications {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}
.cert-badge {
  font-size: var(--text-xs);
  color: rgba(250,247,242,0.5);
  border: 1px solid rgba(201,169,110,0.15);
  border-radius: var(--radius-full);
  padding: 2px var(--space-3);
  letter-spacing: 0.05em;
}
.footer-social {
  display: flex;
  gap: var(--space-2);
}
.social-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: rgba(201,169,110,0.08);
  color: rgba(250,247,242,0.5);
  border: 1px solid rgba(201,169,110,0.12);
  transition: all var(--transition-fast);
}
.social-btn:hover {
  background: var(--color-gold);
  color: var(--color-charcoal);
  border-color: var(--color-gold);
}
.social-btn svg {
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
}

.footer-nav h3,
.footer-contact h3 {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-stone-light);
  margin-bottom: var(--space-5);
}
.footer-nav ul { display: flex; flex-direction: column; gap: var(--space-3); }
.footer-nav a {
  font-size: var(--text-sm);
  color: rgba(250,247,242,0.5);
  transition: color var(--transition-fast);
  text-decoration: none;
}
.footer-nav a:hover { color: var(--color-gold); }

.footer-address {
  font-style: normal;
  font-size: var(--text-sm);
  color: rgba(250,247,242,0.5);
  line-height: 1.7;
}
.footer-address a {
  color: rgba(250,247,242,0.5);
  transition: color var(--transition-fast);
}
.footer-address a:hover { color: var(--color-gold); }

.footer-bottom {
  border-top: 1px solid rgba(201,169,110,0.08);
  padding: var(--space-4) 0;
}
.footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.footer-copy {
  font-size: var(--text-xs);
  color: rgba(250,247,242,0.3);
}
.footer-payment {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.payment-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(250,247,242,0.4);
  border: 1px solid rgba(250,247,242,0.1);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
}
.footer-made {
  font-size: var(--text-xs);
  color: rgba(250,247,242,0.3);
}

@media (max-width: 1100px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-bottom-inner { flex-direction: column; text-align: center; }
}
@media (max-width: 380px) {
  .footer-grid { grid-template-columns: 1fr; }
}
`;
}
