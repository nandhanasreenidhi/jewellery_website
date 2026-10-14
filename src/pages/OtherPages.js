// =========================================================
//  AARANYA — Wishlist Page
// =========================================================

import { store, PRODUCTS, formatPrice } from '../data.js';
import { renderProductCard } from '../ProductCard.js';
import { showToast, initLazyImages } from '../utils.js';

export function renderWishlist(container, navigateFn) {
  const wishlistProducts = store.wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (wishlistProducts.length === 0) {
    container.innerHTML = `
      <div class="container section" style="padding-top:calc(var(--space-20) + 60px);text-align:center;">
        <h1 class="headline" style="margin-bottom:var(--space-4);">My Wishlist</h1>
        <div style="max-width:400px;margin:0 auto;">
          <div style="font-size:4rem;color:var(--color-gold);opacity:0.3;margin-bottom:var(--space-5);" aria-hidden="true">♡</div>
          <h2 class="title" style="margin-bottom:var(--space-3);">Your wishlist is empty</h2>
          <p class="body text-stone" style="margin-bottom:var(--space-6);">Save pieces you love and revisit them whenever you're ready.</p>
          <a href="/collections" class="btn btn-primary btn-lg" data-link>Discover Collections</a>
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
    <div class="container" style="padding-top:calc(var(--space-16) + 60px);padding-bottom:var(--space-16);">
      <div class="flex-between" style="margin-bottom:var(--space-10);flex-wrap:wrap;gap:var(--space-4);">
        <div>
          <h1 class="headline">My Wishlist</h1>
          <p class="body text-stone" style="margin-top:var(--space-2);">${wishlistProducts.length} saved piece${wishlistProducts.length !== 1 ? 's' : ''}</p>
        </div>
        <div style="display:flex;gap:var(--space-3);">
          <button class="btn btn-primary" id="add-all-cart" aria-label="Move all wishlist items to cart">
            Move All to Cart
          </button>
          <button class="btn btn-outline" id="clear-wishlist" aria-label="Clear entire wishlist" style="color:var(--color-stone);border-color:var(--color-stone);">
            Clear Wishlist
          </button>
        </div>
      </div>

      <div class="products-grid" role="list" id="wishlist-grid" aria-label="Wishlist products" style="grid-template-columns:repeat(4,1fr);">
        <!-- Cards injected by JS -->
      </div>
    </div>
  `;

  // Inject cards
  const grid = container.querySelector('#wishlist-grid');
  wishlistProducts.forEach(product => {
    const card = renderProductCard(product, navigateFn);
    card.setAttribute('role', 'listitem');
    grid.appendChild(card);
  });

  container.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  container.querySelector('#add-all-cart')?.addEventListener('click', () => {
    wishlistProducts.forEach(p => store.addToCart(p.id, 1));
    showToast(`${wishlistProducts.length} items added to cart`, '✦', 4000);
  });

  container.querySelector('#clear-wishlist')?.addEventListener('click', () => {
    store.wishlist = [];
    store.saveWishlist();
    showToast('Wishlist cleared', '✕');
    renderWishlist(container, navigateFn);
  });

  // Listen for wishlist changes (when items removed from cards)
  document.addEventListener('wishlist:updated', () => {
    renderWishlist(container, navigateFn);
  }, { once: true });

  setTimeout(() => initLazyImages(), 50);
}

// =========================================================
//  AARANYA — About Page
// =========================================================

export function renderAbout(container, navigateFn) {
  container.innerHTML = `
    <!-- Hero -->
    <div class="about-hero" style="position:relative;height:60vh;min-height:440px;overflow:hidden;display:flex;align-items:flex-end;">
      <img
        
src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&q=85"

        alt="Indian gold jewellery artisan at work"
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%;"
        loading="eager"
        fetchpriority="high"
      />
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(30,26,23,0.85) 0%,rgba(30,26,23,0.3) 60%,transparent 100%);" aria-hidden="true"></div>
      <div class="container" style="position:relative;z-index:1;padding-bottom:var(--space-12);">
        <p class="subtitle text-gold">Our Heritage</p>
        <h1 class="headline text-ivory" style="margin-top:var(--space-3);">The AARANYA Story</h1>
      </div>
    </div>

    <!-- Story -->
    <section class="section" aria-labelledby="story-heading">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-16);align-items:center;">
          <div>
            <p class="subtitle text-gold">Our Foundation</p>
            <h2 class="headline" id="story-heading" style="margin:var(--space-4) 0;">Born from a Deep Reverence for Indian Craft</h2>
            <p class="body-lg text-stone" style="margin-bottom:var(--space-5);">
              AARANYA — meaning 'forest' in Sanskrit, a place of beauty, abundance and life — was founded 
              in 1999 by master goldsmith Ramesh Kumar Verma in the jewellery lanes of Jaipur. 
              What began as a small family workshop has grown into a celebrated jewellery house with 
              artisan partnerships across Rajasthan, Hyderabad, and Kerala.
            </p>
            <p class="body text-stone">
              We believe fine jewellery should carry stories. Each piece we create honours the kaarigar — 
              the master craftsperson — whose hands transform raw gold and gemstones into heirlooms 
              that outlast generations.
            </p>
          </div>
          <div style="position:relative;">
            <img
             
src="https://images.unsplash.com/photo-1657869208328-f54f2ede131b?auto=format&fit=crop&w=800&q=85"

              alt="Exquisite Indian gold and gemstone jewellery arranged artistically"
              style="width:100%;border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);aspect-ratio:4/5;object-fit:cover;"
              loading="eager"
fetchpriority="high"
            />
            <div style="position:absolute;bottom:-20px;right:-20px;background:var(--color-charcoal);border:1px solid rgba(201,169,110,0.2);border-radius:var(--radius-md);padding:var(--space-5);text-align:center;box-shadow:var(--shadow-lg);">
              <span style="display:block;font-family:var(--font-serif);font-size:var(--text-4xl);color:var(--color-gold);font-weight:300;">1999</span>
              <span style="display:block;font-size:var(--text-xs);letter-spacing:0.1em;text-transform:uppercase;color:rgba(250,247,242,0.6);margin-top:var(--space-1);">Est. Jaipur</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section bg-charcoal" aria-labelledby="values-heading">
      <div class="container">
        <div class="text-center" style="margin-bottom:var(--space-12);">
          <p class="subtitle text-gold">What We Stand For</p>
          <h2 class="headline text-ivory" id="values-heading" style="margin-top:var(--space-3);">Our Values</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8);">
          ${[
      { icon: '◈', title: 'Craft Excellence', desc: 'Every AARANYA piece passes through at least five stages of hand-finishing by master kaarigars who have honed their skills over decades.' },
      { icon: '✦', title: 'Honest Materials', desc: 'We use only BIS hallmarked gold, certified natural gemstones, and ethically sourced materials. No compromise, ever.' },
      { icon: '○', title: 'Enduring Relationships', desc: 'We build jewellery for a lifetime, and we build relationships for generations. Our team is here long after your purchase.' },
    ].map(v => `
            <div style="text-align:center;padding:var(--space-8);">
              <div style="font-size:2rem;color:var(--color-gold);margin-bottom:var(--space-5);" aria-hidden="true">${v.icon}</div>
              <h3 style="font-family:var(--font-serif);font-size:var(--text-2xl);color:var(--color-ivory);margin-bottom:var(--space-3);">${v.title}</h3>
              <p style="font-size:var(--text-sm);color:rgba(250,247,242,0.6);line-height:1.7;">${v.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section" aria-labelledby="team-heading">
      <div class="container text-center">
        <p class="subtitle text-gold">The People Behind the Pieces</p>
        <h2 class="headline" id="team-heading" style="margin:var(--space-3) 0 var(--space-10);">Our Master Artisans</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-8);">
          ${[
      { name: 'Ramesh Verma', role: 'Founder & Master Goldsmith', city: 'Jaipur', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85' },
      { name: 'Fatima Begum', role: 'Kundan & Meenakari Expert', city: 'Hyderabad', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85' },
      { name: 'Rajan Nair', role: 'Diamond Setting Specialist', city: 'Thrissur', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85' },
    ].map(t => `
            <div>
              <div style="width:160px;height:160px;border-radius:var(--radius-full);overflow:hidden;margin:0 auto var(--space-5);border:3px solid var(--color-gold);box-shadow:var(--shadow-md);">
                <img src="${t.img}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;object-position:top;" loading="lazy" />
              </div>
              <h3 style="font-family:var(--font-serif);font-size:var(--text-xl);margin-bottom:var(--space-1);">${t.name}</h3>
              <p style="font-size:var(--text-sm);color:var(--color-gold);font-weight:500;">${t.role}</p>
              <p style="font-size:var(--text-xs);color:var(--color-stone);margin-top:var(--space-1);">${t.city}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-green-deep text-center" aria-label="Contact call to action">
      <div class="container">
        <p class="subtitle text-gold">Work With Us</p>
        <h2 class="headline text-ivory" style="margin:var(--space-4) 0;">Commission Your Bespoke Piece</h2>
        <p class="body-lg" style="color:rgba(250,247,242,0.75);max-width:500px;margin:0 auto var(--space-8);">
          Have an idea for a custom jewellery piece? Our design team works closely with you to bring your vision to life.
        </p>
        <a href="/contact" class="btn btn-primary btn-lg" data-link>Start a Conversation</a>
      </div>
    </section>
  `;

  container.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  setTimeout(() => initLazyImages(), 50);
}

// =========================================================
//  AARANYA — Contact Page
// =========================================================

export function renderContact(container, navigateFn) {
  container.innerHTML = `
    <div class="container" style="padding-top:calc(var(--space-16) + 80px);padding-bottom:var(--space-16);">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-16);align-items:start;">
        
        <!-- Info -->
        <div>
          <p class="subtitle text-gold">Get in Touch</p>
          <h1 class="headline" style="margin:var(--space-4) 0;">Talk to Our Jewellery Specialists</h1>
          <p class="body-lg text-stone" style="margin-bottom:var(--space-8);">
            Whether you have a question about a specific piece, want to arrange a private viewing, 
            or wish to commission a bespoke creation — we're here to help.
          </p>

          <div style="display:flex;flex-direction:column;gap:var(--space-6);">
            ${[
      { icon: '📞', label: 'Phone', value: '+91 XXXXXXXXXX', sub: 'Mon–Sat, 10am–7pm IST' },
      { icon: '✉', label: 'Email', value: 'hello@aaranya.in', sub: 'Response within 24 hours' },
      { icon: '📍', label: 'Studio', value: 'Johri Bazaar, Jaipur, Rajasthan 302003', sub: 'By appointment only' },
      { icon: '💬', label: 'WhatsApp', value: 'XXXXXXXXXX', sub: 'Quick queries and photos welcome' },
    ].map(c => `
              <div style="display:flex;gap:var(--space-4);align-items:flex-start;">
                <div style="width:44px;height:44px;background:var(--color-cream);border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;">${c.icon}</div>
                <div>
                  <p style="font-size:var(--text-xs);font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-stone);margin-bottom:var(--space-1);">${c.label}</p>
                  <p style="font-size:var(--text-base);font-weight:500;color:var(--color-charcoal);">${c.value}</p>
                  <p style="font-size:var(--text-xs);color:var(--color-stone);">${c.sub}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Social links -->
          <div style="margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--color-cream);">
            <p class="subtitle text-stone" style="margin-bottom:var(--space-4);">Follow AARANYA</p>
            <div style="display:flex;gap:var(--space-3);">
              ${['Instagram', 'Pinterest', 'Facebook', 'YouTube'].map(s => `
                <button class="btn btn-outline btn-sm" style="color:var(--color-charcoal);border-color:var(--color-cream);" aria-label="Follow AARANYA on ${s}">${s}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Form -->
        <div style="background:var(--color-white);border-radius:var(--radius-xl);padding:var(--space-8);box-shadow:var(--shadow-md);">
          <h2 class="title" style="margin-bottom:var(--space-6);font-size:1.4rem;">Send Us a Message</h2>
          <form id="contact-form" aria-label="Contact form" novalidate style="display:flex;flex-direction:column;gap:var(--space-4);">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
              <div class="form-group">
                <label class="form-label" for="contact-fname">First Name *</label>
                <input type="text" id="contact-fname" class="form-input" required autocomplete="given-name" placeholder="Priya" />
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-lname">Last Name *</label>
                <input type="text" id="contact-lname" class="form-input" required autocomplete="family-name" placeholder="Sharma" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">Email Address *</label>
              <input type="email" id="contact-email" class="form-input" required autocomplete="email" placeholder="you@example.com" />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-phone">Phone Number</label>
              <input type="tel" id="contact-phone" class="form-input" autocomplete="tel" placeholder="XXXXXXXXXX" />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-subject">Subject</label>
              <select id="contact-subject" class="form-select">
                <option value="">Select a topic…</option>
                <option value="product">Product Enquiry</option>
                <option value="custom">Custom / Bespoke Order</option>
                <option value="bridal">Bridal Consultation</option>
                <option value="repair">Repair &amp; Restoration</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">Message *</label>
              <textarea id="contact-message" class="form-input" rows="4" required placeholder="Tell us about the piece you're interested in, or any questions you have…" style="resize:vertical;"></textarea>
            </div>
            <div style="display:flex;align-items:flex-start;gap:var(--space-3);">
              <input type="checkbox" id="contact-consent" style="margin-top:2px;accent-color:var(--color-gold);" />
              <label for="contact-consent" style="font-size:var(--text-xs);color:var(--color-stone);line-height:1.6;">
                I agree to AARANYA's Privacy Policy and consent to being contacted about my enquiry.
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-full" id="contact-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const fname = container.querySelector('#contact-fname')?.value;
    const consent = container.querySelector('#contact-consent')?.checked;
    if (!consent) {
      showToast('Please agree to our Privacy Policy to proceed.', '⚠');
      return;
    }
    if (fname) {
      const btn = container.querySelector('#contact-submit');
      btn.textContent = '✓ Message Sent';
      btn.style.background = 'var(--color-green-mid)';
      btn.style.borderColor = 'var(--color-green-mid)';
      btn.disabled = true;
      showToast(`Thank you ${fname}! We'll respond within 24 hours.`, '✉', 5000);
    }
  });

  container.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });
}

// =========================================================
//  AARANYA — Lookbook Page
// =========================================================

export function renderLookbook(container, navigateFn) {
  const LOOKBOOK_ITEMS = [
    {
      img: 'https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200',
      fallback: 'https://i.pinimg.com/736x/8e/7e/e1/8e7ee1fc2e282c6156bbc4cd993b6c08.jpg',
      alt: 'Traditional gold Kundan bridal necklace',
      caption: 'The Rajputana Bride',
      category: 'Bridal'
    },
    {
      img: 'https://thealchemystudio.co.in/cdn/shop/files/ChatGPT_Image_Jun_9_2025_02_29_38_PM.png?v=1768736189&width=1024',
      fallback: 'https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200',
      alt: 'Elegant gemstone pendant jewellery',
      caption: 'Heritage Gold',
      category: 'Editorial'
    },
    {
      img: 'https://sonasansaar.co.nz/cdn/shop/files/GB03307_3.jpg?v=1759721940',
      fallback: 'https://imgmediagumlet.lbb.in/media/2019/08/5d5f8e1d35851f2070829a87_1566543389435.jpg',
      alt: 'Traditional gold bangles',
      caption: 'Festival Glow',
      category: 'Festive'
    },
    {
      img: 'https://cdn.unsaid.com/700x700_PX_3_e2c9d937b3.webp',
      fallback: 'https://media.superjeweler.com/f_auto/blog-images/LGD-Earrings/What_are_lab_grown_diamond_earrings',
      alt: 'Diamond earrings close-up',
      caption: 'Ocean Heirlooms',
      category: 'Contemporary'
    },
    {
      img: 'https://i.pinimg.com/736x/63/b0/e8/63b0e888b5707dda6a306cc3828f0ba7.jpg',
      fallback: 'https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200',
      alt: 'Indian bridal jewellery styling',
      caption: 'Stack Season',
      category: 'Everyday'
    },
    // {
    //   img: 'https://thealchemystudio.co.in/cdn/shop/files/ChatGPT_Image_Jun_9_2025_02_29_38_PM.png?v=1768736189&width=1024',
    //   fallback: 'https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200',
    //   alt: 'Statement gemstone jewellery',
    //   caption: 'Diamond Days',
    //   category: 'Contemporary'
    // },
    // {
    //   img: 'https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200',
    //   fallback: 'https://i.pinimg.com/736x/8e/7e/e1/8e7ee1fc2e282c6156bbc4cd993b6c08.jpg',
    //   alt: 'Intricate traditional gold necklace',
    //   caption: 'Modern Heritage',
    //   category: 'Editorial'
    // },
    // {
    //   img: 'https://sonasansaar.co.nz/cdn/shop/files/GB03307_3.jpg?v=1759721940',
    //   fallback: 'https://imgmediagumlet.lbb.in/media/2019/08/5d5f8e1d35851f2070829a87_1566543389435.jpg',
    //   alt: 'Gold jewellery for special occasions',
    //   caption: 'Gemstone Garden',
    //   category: 'Editorial'
    // },
    // {
    //   img: 'https://cdn.unsaid.com/700x700_PX_3_e2c9d937b3.webp',
    //   fallback: 'https://media.superjeweler.com/f_auto/blog-images/LGD-Earrings/What_are_lab_grown_diamond_earrings',
    //   alt: 'Elegant diamond earrings',
    //   caption: 'Close-Up Glamour',
    //   category: 'Contemporary'
    // },
    {
      img: 'https://media.assettype.com/outlooktraveller/2025-04-16/cgzublm8/RB-03rd-July-23-1563.jpg?auto=format%2Ccompress&dpr=1.0&fit=max&format=webp&w=801',
      fallback: 'https://nyarah.in/assets/images/lehenga.webp',
      alt: 'Bridal Kundan jewellery with a red bridal outfit',
      caption: 'The Rajputana Bride',
      category: 'Bridal'
    },
    {
      img: 'https://fioresejewelry.com/cdn/shop/files/fiorese-high-jewelry-emerald-majesty-necklace-3979199_1800x1800.jpg?v=1768465816',
      fallback: 'https://beautygems.com/wp-content/uploads/2025/07/imgi_25_491339043_18127617586427133_1786504866860380773_n.jpg',
      alt: 'Emerald and diamond statement necklace',
      caption: 'Emerald Majesty',
      category: 'Fine Jewellery'
    },
    {
      img: 'https://www.gprjewellers.com/assets/gold_necklace_hero.png',
      fallback: 'https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/2026/store-promotion/IND/Vizag-Showroom/Big-1.jpg',
      alt: 'Intricate South Indian temple gold necklace',
      caption: 'Temple Treasures',
      category: 'Heritage'
    },


    {
      img: 'https://www.kisna.com/products/ruby-pendant',
      fallback: 'https://i.pinimg.com/736x/63/b0/e8/63b0e888b5707dda6a306cc3828f0ba7.jpg',
      alt: 'Ruby pendant necklace with ornate detailing',
      caption: 'Ruby Reverie',
      category: 'Gemstones'
    },

    {
      img: 'https://assets.softcarat.com/sai-jewellers/ads/684ebc36/original.webp',
      fallback: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/386dc056-97b4-4807-b12b-48bb02c99912.jpg',
      alt: 'Ornate gold bangles arranged on a luxury display',
      caption: 'The Art of Gold',
      category: 'Gold'
    },
    {
      img: 'https://europeanj.com/cdn/shop/files/Gemini_Generated_Image_7xhf9t7xhf9t7xhf.png?v=1755730262&width=1500',
      fallback: 'https://stongle.com/images/large/jared-house-ruby-necklace-pendant.webp',
      alt: 'Diamond engagement ring on a velvet surface',
      caption: 'Forever Begins',
      category: 'Platinum & Diamonds'
    },
    {
      img: 'https://www.bombayjewellery.com/images/temple/4.jpg',
      fallback: 'https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/2025/store-promotion/IND/Sinhagad-Road-Pune/5-min.jpg',
      alt: 'Traditional temple necklace with gemstone details',
      caption: 'Legacy in Every Detail',
      category: 'Heritage'
    },
    {
      img: 'https://static.wixstatic.com/media/e2a15d_9f01f83a06ed43ceb4fca4f7061c5fba~mv2.jpg/v1/fill/w_980%2Ch_980%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/e2a15d_9f01f83a06ed43ceb4fca4f7061c5fba~mv2.jpg',
      fallback: 'https://fioresejewelry.com/cdn/shop/files/fiorese-high-jewelry-emerald-majesty-necklace-3979199_1800x1800.jpg?v=1768465816',
      alt: 'Pearl necklace styled on soft ivory fabric',
      caption: 'Pearls of Grace',
      category: 'Contemporary'
    },
    {
      img: 'https://www.anjolee.com/Admin/UploadImages/Lifestyle/SB776_6.jpg',
      fallback: 'https://crystalith.com/images/large/best-quality-diamond-stud-earrings-close-up-sparkling.webp',
      alt: 'Diamond tennis bracelet on blush satin',
      caption: 'A Quiet Brilliance',
      category: 'Diamonds'
    },
    {
      img: 'https://nyarah.in/assets/images/lehenga.webp',
      fallback: 'https://media.assettype.com/outlooktraveller/2025-04-16/cgzublm8/RB-03rd-July-23-1563.jpg?auto=format%2Ccompress&dpr=1.0&fit=max&format=webp&w=801',
      alt: 'Traditional bridal jewellery with emerald accents',
      caption: 'Royal Radiance',
      category: 'Bridal'
    },
    {
      img: 'https://sencowebfiles.s3.ap-south-1.amazonaws.com/product-images/386dc056-97b4-4807-b12b-48bb02c99912.jpg',
      fallback: 'https://assets.softcarat.com/sai-jewellers/ads/684ebc36/original.webp',
      alt: 'Gold bangles against a deep burgundy backdrop',
      caption: 'Golden Hour',
      category: 'Gold'
    },

    {
      img: 'https://beautygems.com/wp-content/uploads/2025/07/imgi_25_491339043_18127617586427133_1786504866860380773_n.jpg',
      fallback: 'https://fioresejewelry.com/cdn/shop/files/fiorese-high-jewelry-emerald-majesty-necklace-3979199_1800x1800.jpg?v=1768465816',
      alt: 'Emerald and diamond necklace against a dark backdrop',
      caption: 'Midnight Emeralds',
      category: 'Fine Jewellery'
    },
    {
      img: 'https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/2025/store-promotion/IND/Sinhagad-Road-Pune/5-min.jpg',
      fallback: 'https://www.gprjewellers.com/assets/gold_necklace_hero.png',
      alt: 'Traditional gold necklace and matching earrings',
      caption: 'Heirloom Dreams',
      category: 'Heritage'
    },
    {
      img: 'https://www.lindelli.com/cdn/shop/files/LINDELLI_Bracelet_Diamond_2048x.png?v=1742184910',
      fallback: 'https://www.anjolee.com/Admin/UploadImages/Lifestyle/SB776_6.jpg',
      alt: 'Diamond bracelet styled in an elegant editorial setting',
      caption: 'Modern Elegance',
      category: 'Contemporary'
    },
    {
      img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85',
      fallback: 'https://cdn.unsaid.com/700x700_PX_3_e2c9d937b3.webp',
      alt: 'Elegant diamond jewellery close-up',
      caption: 'A Study in Sparkle',
      category: 'Diamonds'
    },
  ];

  container.innerHTML = `
    <div style="padding-top:calc(var(--space-12) + 60px);">

      <!-- Header -->
      <div class="container" style="margin-bottom:var(--space-10);">
        <p class="subtitle text-gold">Visual Stories</p>

        <h1 class="headline" style="margin:var(--space-3) 0;">
          AARANYA Lookbook
        </h1>

        <p class="body text-stone" style="max-width:520px;">
          A curated gallery of jewellery narratives — from intimate bridal
          moments to bold editorial expressions of Indian luxury.
        </p>
      </div>

      <!-- Lookbook Gallery -->
      <div class="container">
        <div
          class="lookbook-masonry"
          role="list"
          aria-label="Lookbook gallery"
        >
          ${LOOKBOOK_ITEMS.map((item, i) => `
            <figure
              class="lookbook-fig reveal delay-${(i % 5) + 1}"
              role="listitem"
              style="${i === 0 || i === 4 ? 'grid-row:span 2;' : ''}"
            >
              <img
                src="${item.img}"
                alt="${item.alt}"
                class="lookbook-fig__img img-cover"
                loading="${i < 3 ? 'eager' : 'lazy'}"
                width="600"
                height="${i === 0 || i === 4 ? '800' : '400'}"
                onerror="if(this.dataset.fallbackTried !== 'true'){this.dataset.fallbackTried='true';this.src='${item.fallback}';}else{this.style.opacity='0';}"
              />

              <figcaption class="lookbook-fig__caption">
                <span class="lookbook-fig__cat">
                  ${item.category}
                </span>

                <span class="lookbook-fig__title">
                  ${item.caption}
                </span>
              </figcaption>
            </figure>
          `).join('')}
        </div>
      </div>

      <!-- Call to Action -->
      <div class="section text-center bg-ivory-warm">
        <div class="container">
          <h2 class="headline" style="margin-bottom:var(--space-4);">
            Find Your Perfect Piece
          </h2>

          <p class="body text-stone" style="margin-bottom:var(--space-8);">
            Every jewel in this lookbook is available to purchase or enquire about.
          </p>

          <a
            href="/collections"
            class="btn btn-primary btn-lg"
            data-link
          >
            Shop the Collection
          </a>
        </div>
      </div>

    </div>
  `;

  // Handle internal navigation
  container.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  // Initialize scroll animations
  setTimeout(() => {
    const { initScrollReveal } = window._aaranyaUtils || {};

    if (initScrollReveal) {
      initScrollReveal();
    }
  }, 50);
}



// =========================================================
//  AARANYA — Consultation Page
// =========================================================

export function renderConsultation(container, navigateFn) {
  container.innerHTML = `
    <style>
      /* Consultation page */
      .consultation-page {
        padding-top: calc(var(--space-16) + 60px);
        padding-bottom: var(--space-20);
        overflow-x: clip;
      }

      .consultation-inner {
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
      }

      .consultation-intro {
        text-align: center;
        margin-bottom: var(--space-12);
      }

      .consultation-intro .consultation-description {
        max-width: 640px;
        margin: 0 auto;
      }

      .consultation-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
        gap: 32px;
        align-items: start;
      }

      .consultation-form-card {
        min-width: 0;
        padding: 32px;
        background: var(--color-white);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        border: 1px solid rgba(201, 169, 110, 0.2);
      }

      .consultation-form-card h2 {
        margin-bottom: 24px;
        font-size: 1.35rem;
        line-height: 1.4;
      }

      #consultation-form {
        display: flex;
        flex-direction: column;
        gap: 18px;
        width: 100%;
        min-width: 0;
      }

      #consultation-form .form-group {
        width: 100%;
        min-width: 0;
        margin: 0;
      }

      #consultation-form .form-label {
        display: block;
        margin-bottom: 8px;
        line-height: 1.5;
      }

      #consultation-form .form-input,
      #consultation-form .form-select {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;
        font-size: 16px;
      }

      #consultation-form .form-input {
        min-height: 48px;
      }

      #consultation-form textarea.form-input {
        min-height: 100px;
        resize: vertical;
      }

      .consultation-fields-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }

      #consult-submit {
        width: 100%;
        min-height: 52px;
        white-space: normal;
        line-height: 1.5;
        margin-top: 4px;
      }

      .consultation-form-note {
        font-size: 0.75rem;
        color: var(--color-stone);
        text-align: center;
        line-height: 1.6;
        margin: 0;
      }

      .consultation-sidebar {
        display: flex;
        flex-direction: column;
        gap: 24px;
        min-width: 0;
      }

      .consultation-privileges {
        background: var(--color-ivory-warm);
        border-radius: var(--radius-lg);
        padding: 24px;
        border: 1px solid rgba(201, 169, 110, 0.3);
      }

      .consultation-privileges h3 {
        font-family: var(--font-serif);
        font-size: 1.3rem;
        line-height: 1.4;
        margin-bottom: 16px;
        color: var(--color-charcoal);
      }

      .consultation-privileges ul {
        display: flex;
        flex-direction: column;
        gap: 16px;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .consultation-privileges li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        font-size: var(--text-sm);
        line-height: 1.65;
        color: var(--color-charcoal-mid);
      }

      .consultation-symbol {
        flex-shrink: 0;
        color: var(--color-gold);
        font-size: 1.1rem;
      }

      .consultation-whatsapp {
        background: var(--color-charcoal);
        border-radius: var(--radius-lg);
        padding: 26px 24px;
        color: var(--color-ivory);
        text-align: center;
      }

      .consultation-whatsapp-icon {
        display: block;
        font-size: 1.8rem;
        margin-bottom: 10px;
      }

      .consultation-whatsapp h4 {
        font-family: var(--font-serif);
        font-size: 1.25rem;
        line-height: 1.45;
        color: var(--color-champagne);
        margin-bottom: 12px;
      }

      .consultation-whatsapp p {
        font-size: var(--text-xs);
        color: rgba(250, 247, 242, 0.75);
        line-height: 1.7;
        margin-bottom: 18px;
      }

      .consultation-whatsapp .btn {
        width: 100%;
        box-sizing: border-box;
        white-space: normal;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .consultation-hotline {
        text-align: center;
        padding: 4px 0 8px;
      }

      .consultation-hotline-label {
        font-size: var(--text-xs);
        color: var(--color-stone);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 6px;
      }

      .consultation-hotline a {
        font-family: var(--font-serif);
        font-size: 1.2rem;
        color: var(--color-charcoal);
        text-decoration: none;
        font-weight: 600;
        overflow-wrap: anywhere;
      }

      /* Tablet */
      @media (max-width: 900px) {
        .consultation-page {
          padding-top: 125px;
          padding-bottom: 56px;
        }

        .consultation-grid {
          grid-template-columns: minmax(0, 1fr);
          gap: 24px;
        }

        .consultation-sidebar {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: start;
          gap: 18px;
        }

        .consultation-hotline {
          grid-column: 1 / -1;
        }
      }

      /* Mobile */
      @media (max-width: 600px) {
        .consultation-page {
          padding-top: 108px;
          padding-bottom: 40px;
        }

        .consultation-inner {
          padding-left: 16px;
          padding-right: 16px;
        }

        .consultation-intro {
          margin-bottom: 28px;
        }

        .consultation-intro .subtitle {
          margin-bottom: 10px;
        }

        .consultation-intro h1 {
          font-size: clamp(1.8rem, 7vw, 2.3rem);
          line-height: 1.2;
          margin: 10px 0 14px !important;
        }

        .consultation-intro .consultation-description {
          font-size: 0.95rem;
          line-height: 1.75;
          padding: 0 2px;
        }

        .consultation-grid {
          grid-template-columns: minmax(0, 1fr);
          gap: 20px;
        }

        .consultation-form-card {
          padding: 20px 16px;
          border-radius: 16px;
        }

        .consultation-form-card h2 {
          font-size: 1.22rem;
          margin-bottom: 20px;
        }

        #consultation-form {
          gap: 17px;
        }

        .consultation-fields-row {
          grid-template-columns: minmax(0, 1fr);
          gap: 17px;
        }

        #consultation-form .form-label {
          font-size: 0.9rem;
          margin-bottom: 7px;
        }

        #consultation-form .form-input,
        #consultation-form .form-select {
          min-height: 48px;
          padding: 12px;
          border-radius: 9px;
        }

        #consultation-form textarea.form-input {
          min-height: 110px;
        }

        #consult-submit {
          font-size: 0.9rem;
          padding: 14px 12px;
        }

        .consultation-form-note {
          font-size: 0.72rem;
        }

        .consultation-sidebar {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .consultation-privileges,
        .consultation-whatsapp {
          padding: 21px 18px;
          border-radius: 14px;
        }

        .consultation-privileges h3 {
          font-size: 1.25rem;
        }

        .consultation-privileges li {
          font-size: 0.88rem;
          line-height: 1.7;
        }

        .consultation-whatsapp h4 {
          font-size: 1.2rem;
        }

        .consultation-whatsapp p {
          font-size: 0.82rem;
          line-height: 1.7;
        }

        .consultation-hotline {
          padding: 4px 0 8px;
        }

        .consultation-hotline a {
          font-size: 1.15rem;
        }
      }

      /* Extra-small phones */
      @media (max-width: 360px) {
        .consultation-inner {
          padding-left: 12px;
          padding-right: 12px;
        }

        .consultation-form-card {
          padding: 17px 13px;
        }

        .consultation-privileges,
        .consultation-whatsapp {
          padding: 18px 15px;
        }
      }
    </style>

    <main class="consultation-page">
      <div class="consultation-inner">

        <!-- Header -->
        <header class="consultation-intro">
          // <p class="subtitle text-gold"> </p>

          <h1 class="headline" style="margin:var(--space-3) 0 var(--space-4);">
            Book a Private Jewellery Consultation
          </h1>

          <p class="body-lg text-stone consultation-description">
            Experience undivided attention from our senior jewellery specialists.
            Explore curated trays of BIS-hallmarked gold, GIA diamonds, and rare
            gemstones tailored to your personal aesthetic.
          </p>
        </header>

        <div class="consultation-grid">

          <!-- Booking Form -->
          <section class="consultation-form-card">
            <h2 class="title">Reserve Your Appointment</h2>

            <form id="consultation-form">

              <div class="form-group">
                <label class="form-label" for="consult-format">
                  Consultation Format *
                </label>

                <select id="consult-format" class="form-select" required>
                  <option value="jaipur">In-Person Private Salon — Johri Bazaar, Jaipur</option>
                  <option value="delhi">Private Showing Suite — New Delhi</option>
                  <option value="mumbai">Private Showing Suite — Mumbai</option>
                  <option value="virtual">Virtual 4K Video Consultation (Worldwide)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="consult-interest">
                  Collection of Primary Interest *
                </label>

                <select id="consult-interest" class="form-select" required>
                  <option value="bridal">Royal Bridal Trousseau (Polki, Kundan &amp; Jadau)</option>
                  <option value="bespoke">Bespoke Heirloom Commission / High Jewellery</option>
                  <option value="diamonds">Solitaires &amp; Platinum Engagement</option>
                  <option value="mens">Men's Regal Jewellery Collection</option>
                  <option value="gemstones">Natural Gemstones (Sapphire, Ruby, Emerald)</option>
                  <option value="everyday">Everyday Fine Jewellery &amp; Gifting</option>
                </select>
              </div>

              <div class="consultation-fields-row">
                <div class="form-group">
                  <label class="form-label" for="consult-date">
                    Preferred Date *
                  </label>

                  <input
                    type="date"
                    id="consult-date"
                    class="form-input"
                    required
                    min="${new Date().toLocaleDateString('en-CA')}"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="consult-time">
                    Preferred Time Slot *
                  </label>

                  <select id="consult-time" class="form-select" required>
                    <option value="morning">11:00 AM – 12:30 PM (Morning)</option>
                    <option value="afternoon">02:30 PM – 04:00 PM (Afternoon)</option>
                    <option value="evening">05:00 PM – 06:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              <div class="consultation-fields-row">
                <div class="form-group">
                  <label class="form-label" for="consult-name">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    id="consult-name"
                    class="form-input"
                    placeholder="Ananya Sharma"
                    required
                    autocomplete="name"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="consult-phone">
                    WhatsApp / Phone *
                  </label>

                  <input
                    type="tel"
                    id="consult-phone"
                    class="form-input"
                    placeholder="XXXXXXXXXX"
                    required
                    autocomplete="tel"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="consult-email">
                  Email Address *
                </label>

                <input
                  type="email"
                  id="consult-email"
                  class="form-input"
                  placeholder="ananya@example.com"
                  required
                  autocomplete="email"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="consult-notes">
                  Special Preferences / Custom Requests
                </label>

                <textarea
                  id="consult-notes"
                  class="form-input"
                  rows="4"
                  placeholder="Tell us if you have specific designs in mind, wedding dates, or heirloom stones you wish to reset…"
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-lg w-full"
                id="consult-submit"
              >
                Confirm Consultation Request
              </button>

              <p class="consultation-form-note">
                Appointment recorded locally for demo. Our concierge will contact
                you via WhatsApp/call to confirm the salon booking.
              </p>

            </form>
          </section>

          <!-- Sidebar -->
          <aside class="consultation-sidebar">

            <!-- Salon Privileges -->
            <section class="consultation-privileges">
              <h3>What to Expect</h3>

              <ul>
                <li>
                  <span class="consultation-symbol">✦</span>
                  <span>
                    <strong>Dedicated Specialist:</strong>
                    90 minutes of dedicated curation without time pressure.
                  </span>
                </li>

                <li>
                  <span class="consultation-symbol">◈</span>
                  <span>
                    <strong>Touch &amp; Try:</strong>
                    Experience the weight, purity, and drape of authentic heirloom pieces.
                  </span>
                </li>

                <li>
                  <span class="consultation-symbol">◇</span>
                  <span>
                    <strong>Bespoke Sketching:</strong>
                    Work directly with our design atelier for custom modifications.
                  </span>
                </li>
              </ul>
            </section>

            <!-- WhatsApp -->
            <section class="consultation-whatsapp">
              <span class="consultation-whatsapp-icon">💬</span>

              <h4>Need an Immediate Appointment?</h4>

              <p>
                Our concierge team is available on WhatsApp Mon–Sat, 10am–7pm IST
                for instant scheduling and catalogue sharing.
              </p>

              <a
                href="https://wa.me/919876543210?text=${encodeURIComponent('Hello AARANYA Concierge, I would like to schedule a private jewellery consultation appointment.')}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline btn-md"
                style="color:var(--color-gold);border-color:var(--color-gold);"
              >
                Chat on WhatsApp Now
              </a>
            </section>

            <!-- Hotline -->
            <div class="consultation-hotline">
              <p class="consultation-hotline-label">Direct Atelier Line</p>

              <a href="tel:+919876543210">
                +91 XXXXXXXXXX 
              </a>
            </div>

          </aside>
        </div>
      </div>
    </main>
  `;

  // Keep the existing consultation form submission handler here if your
  // current file has one. The responsive layout does not submit bookings
  // to a server by itself.



  // Consultation form handler
  container.querySelector('#consultation-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = container.querySelector('#consult-name')?.value;
    const phone = container.querySelector('#consult-phone')?.value;
    const date = container.querySelector('#consult-date')?.value;
    if (name && phone) {
      const btn = container.querySelector('#consult-submit');
      btn.textContent = '✓ Consultation Requested';
      btn.style.background = 'var(--color-green-mid)';
      btn.style.borderColor = 'var(--color-green-mid)';
      btn.disabled = true;
      showToast(`Thank you ${name}! Your consultation request for ${date || 'upcoming dates'} is recorded. Our team will contact you on WhatsApp/phone.`, '✦', 6000);
    }
  });

  container.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });
}

export function getExtraPageStyles() {
  return `
/* Consultation Responsive */
@media (max-width:850px) {
  .consultation-grid { grid-template-columns:1fr !important; }
}

/* About responsive */
@media (max-width:900px) {
  .about-grid { grid-template-columns:1fr !important; }
}

/* Contact responsive */
@media (max-width:900px) {
  .contact-grid { grid-template-columns:1fr !important; }
}

/* Lookbook Masonry */
.lookbook-masonry {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-auto-rows:300px;
  gap:var(--space-3);
  margin-bottom:0;
}
.lookbook-fig {
  position:relative;
  overflow:hidden;
  border-radius:var(--radius-md);
  cursor:pointer;
  background:var(--color-cream);
}
.lookbook-fig__img {
  transition:transform var(--transition-slow), opacity 0.4s ease;
  opacity:0;
}
.lookbook-fig__img.loaded { opacity:1; }
.lookbook-fig:hover .lookbook-fig__img { transform:scale(1.06); }
.lookbook-fig__caption {
  position:absolute;
  bottom:0;left:0;right:0;
  padding:var(--space-5);
  background:linear-gradient(to top,rgba(30,26,23,0.85) 0%,transparent 100%);
  opacity:0;
  transition:opacity var(--transition-base);
  display:flex;
  flex-direction:column;
  gap:var(--space-1);
}
.lookbook-fig:hover .lookbook-fig__caption { opacity:1; }
.lookbook-fig__cat {
  font-size:var(--text-xs);
  font-weight:600;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:var(--color-gold);
}
.lookbook-fig__title {
  font-family:var(--font-serif);
  font-size:var(--text-xl);
  color:var(--color-ivory);
}

@media (max-width:768px) {
  .lookbook-masonry { grid-template-columns:repeat(2,1fr); grid-auto-rows:200px; }
}
@media (max-width:480px) {
  .lookbook-masonry { grid-template-columns:1fr; }
}
`;
}
