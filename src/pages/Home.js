// =========================================================
//  AARANYA — Homepage
// =========================================================

import { PRODUCTS, CATEGORIES, formatPrice } from '../data.js';
import { renderProductCard } from '../ProductCard.js';
import { initScrollReveal, initLazyImages, showToast } from '../utils.js';

const FEATURED_IDS = ['p001', 'p003', 'p002', 'p018', 'p013', 'p015', 'p017', 'p020'];
const TESTIMONIALS = [
  {
    quote: "My Kundan necklace from AARANYA arrived beautifully packaged and looked even more stunning than the photographs. Wore it to my daughter's wedding and received compliments all day.",
    author: "Priya Sharma",
    location: "New Delhi",
    rating: 5,
  },
  {
    quote: "The diamond ring is absolutely breathtaking. The GIA certificate gave us complete confidence. AARANYA's team was helpful, patient and knowledgeable throughout the process.",
    author: "Rahul & Meena Krishnan",
    location: "Bangalore",
    rating: 5,
  },
  {
    quote: "I ordered the bridal set six weeks before my wedding and it arrived with time to spare. Every piece fits perfectly and the gold quality is exceptional. Truly heirloom quality.",
    author: "Ananya Mehta",
    location: "Mumbai",
    rating: 5,
  },
];

const OCCASIONS_DATA = [
  { title: 'Bridal Trousseau', subtitle: 'Royal Polki & Kundan masterpieces', image: '/images/bridal-set.jpg', cat: 'bridal', color: '#6b1f2a' },
  { title: 'Everyday Luxury', subtitle: 'Modern solitaire & delicate gold', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=700&q=85', cat: 'everyday', color: '#2e2821' },
  { title: 'Precious Gemstones', subtitle: 'Untreated sapphires, rubies & emeralds', image: '/images/emerald-pendant.jpg', cat: 'gemstones', color: '#1a3326' },
  { title: 'Men\'s Regal Line', subtitle: 'Platinum kadas & emerald signets', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85', cat: 'mens', color: '#3d3528' },
  { title: 'Auspicious Gifting', subtitle: 'Pure gold coin pendants & keepsakes', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=85', cat: 'gifting', color: '#6b1f2a' },
  { title: 'Festive Gold', subtitle: 'Heritage 22K handcrafted necklaces', image: '/images/hero-necklace.jpg', cat: 'necklaces', color: '#2e2821' },
];

const CRAFTS = [
  { name: 'Kundan', desc: 'Ancient Mughal technique — gemstones set in pure gold foil', icon: '◈' },
  { name: 'Polki', desc: 'Uncut diamond setting that reflects raw natural beauty', icon: '◇' },
  { name: 'Jadau', desc: 'Lost wax casting — intricate filigree and enamel inlay', icon: '◉' },
  { name: 'Meenakari', desc: 'Vibrant enamel artwork on the back of jewellery pieces', icon: '✦' },
];

export function renderHome(container, navigateFn) {
  container.innerHTML = `
    <!-- ═══════════════════════════════════════════════════ -->
    <!-- HERO SECTION                                       -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="hero" aria-label="Hero banner">
      <div class="hero__media">
        <img
          src="/images/hero-necklace.jpg"
          alt="Maharani Kundan necklace — 22 karat gold with rubies and emeralds"
          class="hero__image img-cover"
          fetchpriority="high"
          width="1440"
          height="900"
        />
        <div class="hero__overlay" aria-hidden="true"></div>
      </div>

      <div class="hero__content container">
        <div class="hero__text">
          <div class="hero__badge reveal delay-1">
            <span class="hero__badge-dot">✦</span>
            <span>Atelier Haute Joaillerie 2026</span>
          </div>
          <h1 class="hero__title reveal delay-2">
            Where Heritage<br/>
            <span class="hero__title-accent">Meets Royal Grandeur</span>
          </h1>
          <p class="hero__desc reveal delay-3">
            Handcrafted 22-karat gold, uncut polki diamonds, and certified Zambian emeralds that honour centuries of Indian goldsmithing tradition — elevated for the modern connoisseur.
          </p>
          <div class="hero__actions reveal delay-4">
            <a href="/collections" class="btn btn-primary btn-lg hero__btn-primary" data-link id="hero-cta-explore">
              <span>Explore Collections</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/consultation" class="btn btn-ghost btn-lg hero__btn-secondary" data-link id="hero-cta-consultation">
              Book Private Salon
            </a>
          </div>
        </div>

        <div class="hero__stats reveal delay-5" aria-label="Brand statistics">
          <div class="hero__stat">
            <span class="hero__stat-num">25+</span>
            <span class="hero__stat-label">Years of Craft</span>
          </div>
          <div class="hero__stat-divider" aria-hidden="true"></div>
          <div class="hero__stat">
            <span class="hero__stat-num">BIS</span>
            <span class="hero__stat-label">Hallmarked 916</span>
          </div>
          <div class="hero__stat-divider" aria-hidden="true"></div>
          <div class="hero__stat">
            <span class="hero__stat-num">100%</span>
            <span class="hero__stat-label">Certified Natural</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll" aria-hidden="true">
        <div class="hero__scroll-line"></div>
        <span class="hero__scroll-text">Scroll</span>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- MARQUEE TICKER                                     -->
    <!-- ═══════════════════════════════════════════════════ -->
    <div class="ticker" aria-hidden="true" role="presentation">
      <div class="ticker__track">
        ${Array(3).fill(null).map(() => `
          <span class="ticker__item">BIS Hallmarked Gold</span>
          <span class="ticker__sep">✦</span>
          <span class="ticker__item">GIA Certified Diamonds</span>
          <span class="ticker__sep">✦</span>
          <span class="ticker__item">Free Insured Shipping</span>
          <span class="ticker__sep">✦</span>
          <span class="ticker__item">Lifetime Polish Warranty</span>
          <span class="ticker__sep">✦</span>
          <span class="ticker__item">Custom &amp; Bespoke Orders</span>
          <span class="ticker__sep">✦</span>
          <span class="ticker__item">30-Day Returns</span>
          <span class="ticker__sep">✦</span>
        `).join('')}
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- SHOP BY OCCASION                                   -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="section bg-ivory-warm" id="shop-occasions" aria-labelledby="occasions-heading">
      <div class="container">
        <div class="section-header text-center reveal">
          <p class="subtitle text-gold">Discover Your Style</p>
          <h2 class="headline" id="occasions-heading" style="margin:var(--space-3) 0;">Shop by Occasion</h2>
          <p class="body text-stone" style="max-width:500px;margin:0 auto;">
            Whether you're a bride, celebrating a festival, or simply treating yourself — 
            find the jewellery made for your moment.
          </p>
        </div>

        <div class="occasions-grid">
          ${OCCASIONS_DATA.map((occ, i) => `
            <a 
              href="/collections?cat=${occ.cat}" 
              class="occasion-card reveal delay-${i + 1}"
              data-link
              aria-label="Shop ${occ.title} jewellery"
              style="--occ-color:${occ.color};"
            >
              <div class="occasion-card__image">
                <img 
                  data-src="${occ.image}" 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 4'%3E%3C/svg%3E"
                  alt="${occ.title} jewellery collection"
                  class="img-cover"
                  loading="lazy"
                  width="400"
                  height="500"
                />
              </div>
              <div class="occasion-card__body">
                <h3 class="occasion-card__title">${occ.title}</h3>
                <p class="occasion-card__sub">${occ.subtitle}</p>
                <span class="occasion-card__cta">Explore →</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- FEATURED PRODUCTS                                  -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="section" id="featured-products" aria-labelledby="featured-heading">
      <div class="container">
        <div class="flex-between" style="margin-bottom:var(--space-12);flex-wrap:wrap;gap:var(--space-4);">
          <div class="reveal">
            <p class="subtitle text-gold">Handpicked for You</p>
            <h2 class="headline" id="featured-heading" style="margin-top:var(--space-2);">Featured Pieces</h2>
          </div>
          <a href="/collections" class="btn btn-outline reveal" data-link aria-label="View all jewellery collections">
            View All
          </a>
        </div>

        <div class="products-grid" id="featured-grid" role="list" aria-label="Featured jewellery products">
          <!-- Products injected by JS -->
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- BRAND PROMISE BAND                                 -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="promise-band bg-charcoal section-sm" aria-labelledby="promise-heading">
      <div class="container">
        <h2 id="promise-heading" class="sr-only">Our Brand Promise</h2>
        <div class="promise-grid">
          ${[
      { icon: '✦', title: 'BIS Hallmarked', desc: 'Every gold piece carries the Bureau of Indian Standards hallmark for guaranteed purity.' },
      { icon: '◈', title: 'Certified Gemstones', desc: 'Diamonds are GIA certified. Coloured stones come with GRS or IGI certificates.' },
      { icon: '⬡', title: 'Free Insured Shipping', desc: 'Complimentary insured delivery across India. International shipping available.' },
      { icon: '◉', title: '30-Day Returns', desc: 'Unworn pieces returned within 30 days — no questions asked, full refund.' },
    ].map((p, i) => `
            <div class="promise-item reveal delay-${i + 1}">
              <span class="promise-icon text-gold" aria-hidden="true">${p.icon}</span>
              <h3 class="promise-title">${p.title}</h3>
              <p class="promise-desc">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- CRAFTSMANSHIP STORY                                -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="section craft-section" aria-labelledby="craft-heading">
      <div class="container">
        <div class="craft-inner">
          <div class="craft-media reveal-left">
            <div class="craft-image-stack">
              <img 
                data-src="/images/bridal-set.jpg" 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 4'%3E%3C/svg%3E"
                alt="Indian bridal jewellery — masterpiece craftsmanship"
                class="craft-img craft-img--main img-cover"
                loading="lazy"
                width="500"
                height="600"
              />
              <img 
                data-src="/images/gold-bangles.jpg"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 4'%3E%3C/svg%3E"
                alt="Handcrafted gold filigree bangles"
                class="craft-img craft-img--accent img-cover"
                loading="lazy"
                width="250"
                height="250"
              />
            </div>
            <div class="craft-badge reveal-scale delay-3" aria-label="25 years of heritage craftsmanship">
              <span class="craft-badge__num">25</span>
              <span class="craft-badge__text">Years of Heritage</span>
            </div>
          </div>

          <div class="craft-content reveal-right">
            <p class="subtitle text-gold">The AARANYA Difference</p>
            <h2 class="headline" id="craft-heading" style="margin:var(--space-4) 0;">
              Art Forged in Gold,<br/>Passed Through Generations
            </h2>
            <p class="body-lg text-stone" style="margin-bottom:var(--space-6);">
              Every AARANYA piece is the result of master craftspeople — kaarigars — who have inherited 
              their skills across generations. We work with artisan families in Jaipur, Hyderabad, 
              and Thrissur, honouring regional jewellery traditions while creating pieces built to last centuries.
            </p>

            <div class="craft-techniques">
              ${CRAFTS.map((c, i) => `
                <div class="craft-tech reveal delay-${i + 1}">
                  <span class="craft-tech__icon text-gold" aria-hidden="true">${c.icon}</span>
                  <div>
                    <h4 class="craft-tech__name">${c.name}</h4>
                    <p class="craft-tech__desc">${c.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <a href="/about" class="btn btn-primary btn-lg" style="margin-top:var(--space-8);" data-link>
              Discover Our Story
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- PRIVATE SALON & CONSULTATION EXPERIENCE             -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="section bg-charcoal" id="consultation-section" aria-labelledby="consult-heading">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-12);align-items:center;">
          <div class="reveal-left">
            <p class="subtitle text-gold">Exclusive Atelier Experience</p>
            <h2 class="headline text-ivory" id="consult-heading" style="margin:var(--space-4) 0;">
              Private Viewings &amp; Bespoke Consultations
            </h2>
            <p class="body-lg" style="color:rgba(250,247,242,0.8);margin-bottom:var(--space-6);">
              Whether commissioning an auspicious bridal trousseau, choosing a bespoke high-value heirloom, 
              or seeking a discreet private showing in Jaipur or via virtual 4K video — 
              our master jewellery curators offer one-on-one undivided guidance.
            </p>
            <div style="display:flex;flex-direction:column;gap:var(--space-4);margin-bottom:var(--space-8);">
              <div style="display:flex;align-items:center;gap:var(--space-3);color:var(--color-ivory);">
                <span class="text-gold" style="font-size:1.2rem;">✦</span>
                <span>Private Salon Showroom in Johri Bazaar, Jaipur</span>
              </div>
              <div style="display:flex;align-items:center;gap:var(--space-3);color:var(--color-ivory);">
                <span class="text-gold" style="font-size:1.2rem;">◈</span>
                <span>High-Definition Virtual Video Appointments Worldwide</span>
              </div>
              <div style="display:flex;align-items:center;gap:var(--space-3);color:var(--color-ivory);">
                <span class="text-gold" style="font-size:1.2rem;">◇</span>
                <span>Bespoke Design Sketches &amp; Direct Master Goldsmith Dialogue</span>
              </div>
            </div>
            <div style="display:flex;gap:var(--space-4);flex-wrap:wrap;">
              <a href="/consultation" class="btn btn-primary btn-lg" data-link id="home-book-consult">
                Book a Consultation
              </a>
              <a 
                href="https://wa.me/XXXXXXXXXX?text=Hello%20AARANYA,%20I%20would%20like%20to%20arrange%20a%20private%20jewellery%20consultation." 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-outline btn-lg" 
                style="color:var(--color-gold);border-color:var(--color-gold);display:flex;align-items:center;gap:8px;"
              >
                <span>💬</span> WhatsApp Concierge
              </a>
            </div>
          </div>
          <div class="reveal-right" style="position:relative;">
            <img 
              data-src="/images/bridal-set.jpg" 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 3 4'%3E%3C/svg%3E"
              alt="AARANYA private bridal and bespoke jewellery viewing" 
              class="img-cover" 
              style="border-radius:var(--radius-lg);aspect-ratio:4/5;box-shadow:var(--shadow-xl);border:1px solid rgba(201,169,110,0.3);width:100%;object-fit:cover;"
              loading="lazy"
              width="600"
              height="750"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- TESTIMONIALS                                       -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="section bg-green-deep" id="testimonials" aria-labelledby="testimonials-heading">
      <div class="container">
        <div class="text-center reveal" style="margin-bottom:var(--space-12);">
          <p class="subtitle text-gold">What Our Customers Say</p>
          <h2 class="headline text-ivory" id="testimonials-heading" style="margin-top:var(--space-3);">Stories of Joy</h2>
        </div>

        <div class="testimonials-grid">
          ${TESTIMONIALS.map((t, i) => `
            <blockquote class="testimonial reveal delay-${i + 1}">
              <div class="testimonial__stars" aria-label="${t.rating} out of 5 stars" role="img">
                ${'★'.repeat(t.rating)}
              </div>
              <p class="testimonial__quote">"${t.quote}"</p>
              <footer class="testimonial__footer">
                <div class="testimonial__avatar" aria-hidden="true">${t.author[0]}</div>
                <div>
                  <cite class="testimonial__author">${t.author}</cite>
                  <p class="testimonial__location">${t.location}</p>
                </div>
              </footer>
            </blockquote>
          `).join('')}
        </div>
      </div>
    </section>

  
    <!-- INSTAGRAM / LOOKBOOK TEASER -->
    <section class="section section-sm" id="lookbook-teaser" aria-labelledby="lookbook-heading">
      <div class="container text-center">
        <p class="subtitle text-gold reveal">A World of Fine Jewellery</p>

        <h2
          class="headline reveal delay-1"
          id="lookbook-heading"
          style="margin:var(--space-3) 0;"
        >
          AARANYA Lookbook
        </h2>

        <p
          class="body text-stone reveal delay-2"
          style="margin-bottom:var(--space-10);"
        >
          From royal bridal heirlooms to everyday treasures,
          discover jewellery that makes every moment unforgettable.
        </p>

        <div class="lookbook-grid reveal-scale delay-2">

          <!-- Bridal necklace editorial -->
          <div class="lookbook-item">
            <img
              src="https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200"
              alt="Traditional Indian bridal Kundan necklace with emerald accents"
              class="img-cover loaded"
              loading="eager"
              width="600"
              height="900"
              onload="this.classList.add('loaded')"
              onerror="this.onerror=null;this.src='https://i.pinimg.com/736x/8e/7e/e1/8e7ee1fc2e282c6156bbc4cd993b6c08.jpg';this.classList.add('loaded')"
            />
            <div class="lookbook-item__overlay">
              <a href="/lookbook" class="lookbook-item__link" data-link>
                Discover Bridal Jewellery →
              </a>
            </div>
          </div>

          <!-- Emerald pendant -->
          <div class="lookbook-item">
            <img
              src="https://thealchemystudio.co.in/cdn/shop/files/ChatGPT_Image_Jun_9_2025_02_29_38_PM.png?v=1768736189&width=1024"
              alt="Emerald and diamond pendant in yellow gold"
              class="img-cover loaded"
              loading="lazy"
              width="400"
              height="400"
              onload="this.classList.add('loaded')"
              onerror="this.onerror=null;this.src='https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200';this.classList.add('loaded')"
            />
            <div class="lookbook-item__overlay">
              <a href="/lookbook" class="lookbook-item__link" data-link>
                Explore Gemstones →
              </a>
            </div>
          </div>

          <!-- Gold bangles -->
          <div class="lookbook-item">
            <img
              src="https://sonasansaar.co.nz/cdn/shop/files/GB03307_3.jpg?v=1759721940"
              alt="Intricately detailed traditional gold bangles"
              class="img-cover loaded"
              loading="lazy"
              width="400"
              height="400"
              onload="this.classList.add('loaded')"
              onerror="this.onerror=null;this.src='https://imgmediagumlet.lbb.in/media/2019/08/5d5f8e1d35851f2070829a87_1566543389435.jpg';this.classList.add('loaded')"
            />
            <div class="lookbook-item__overlay">
              <a href="/lookbook" class="lookbook-item__link" data-link>
                Discover Gold →
              </a>
            </div>
          </div>

          <!-- Diamond earrings -->
          <div class="lookbook-item">
            <img
              src="https://cdn.unsaid.com/700x700_PX_3_e2c9d937b3.webp"
              alt="Elegant geometric diamond drop earrings"
              class="img-cover loaded"
              loading="lazy"
              width="400"
              height="400"
              onload="this.classList.add('loaded')"
              onerror="this.onerror=null;this.src='https://media.superjeweler.com/f_auto/blog-images/LGD-Earrings/What_are_lab_grown_diamond_earrings';this.classList.add('loaded')"
            />
            <div class="lookbook-item__overlay">
              <a href="/lookbook" class="lookbook-item__link" data-link>
                Discover Diamonds →
              </a>
            </div>
          </div>

          <!-- Bridal styling -->
          <div class="lookbook-item">
            <img
              src="https://i.pinimg.com/736x/63/b0/e8/63b0e888b5707dda6a306cc3828f0ba7.jpg"
              alt="Indian bridal styling featuring traditional Kundan jewellery"
              class="img-cover loaded"
              loading="lazy"
              width="400"
              height="400"
              onload="this.classList.add('loaded')"
              onerror="this.onerror=null;this.src='https://krishnajewellers.com/cdn/shop/files/gold_kundan_jewellery_online.jpg?crop=center&height=1200&v=1767941891&width=1200';this.classList.add('loaded')"
            />
            <div class="lookbook-item__overlay">
              <a href="/lookbook" class="lookbook-item__link" data-link>
                Bridal Inspiration →
              </a>
            </div>
          </div>

          <!-- Traditional gold jewellery -->
          <div class="lookbook-item">
            <img
              src="https://imgmediagumlet.lbb.in/media/2019/08/5d5f8e1d35851f2070829a87_1566543389435.jpg"
              alt="Close-up of handcrafted gold jewellery detailing"
              class="img-cover loaded"
              loading="lazy"
              width="400"
              height="400"
              onload="this.classList.add('loaded')"
              onerror="this.onerror=null;this.src='https://sonasansaar.co.nz/cdn/shop/files/GB03307_3.jpg?v=1759721940';this.classList.add('loaded')"
            />
            <div class="lookbook-item__overlay">
              <a href="/lookbook" class="lookbook-item__link" data-link>
                Explore Heritage →
              </a>
            </div>
          </div>

        </div>

        <a
          href="/lookbook"
          class="btn btn-dark btn-lg"
          style="margin-top:var(--space-10);"
          data-link
        >
          Explore Full Lookbook
        </a>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════ -->
    <!-- NEWSLETTER / CTA BAND                              -->
    <!-- ═══════════════════════════════════════════════════ -->
    <section class="section newsletter-section bg-burgundy" aria-labelledby="newsletter-heading">
      <div class="container text-center">
        <span class="ornament-diamond text-gold reveal" aria-hidden="true">✦</span>
        <h2 class="headline text-ivory reveal delay-1" id="newsletter-heading" style="margin:var(--space-4) 0 var(--space-3);">
          Join the AARANYA Circle
        </h2>
        <p class="body-lg reveal delay-2" style="color:rgba(250,247,242,0.8);max-width:500px;margin:0 auto var(--space-8);">
          Be the first to discover new collections, exclusive events, and seasonal offers.
        </p>
        <form class="newsletter-form reveal delay-3" id="newsletter-form" aria-label="Newsletter subscription">
          <div class="newsletter-input-wrap">
            <input 
              type="email" 
              class="newsletter-input"
              id="newsletter-email"
              placeholder="Your email address"
              required
              aria-label="Email address for newsletter"
              autocomplete="email"
            />
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </div>
          <p style="font-size:var(--text-xs);color:rgba(250,247,242,0.5);margin-top:var(--space-3);letter-spacing:0.05em;">
            By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  `;

  // Inject featured products
  const featuredGrid = container.querySelector('#featured-grid');
  const featuredProducts = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  featuredProducts.forEach(product => {
    const card = renderProductCard(product, navigateFn);
    card.setAttribute('role', 'listitem');
    featuredGrid.appendChild(card);
  });

  // SPA link binding
  container.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  // Occasion card links
  container.querySelectorAll('.occasion-card[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateFn(link.getAttribute('href'));
    });
  });

  // Newsletter form
  container.querySelector('#newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = container.querySelector('#newsletter-email');
    if (email?.value) {
      showToast('Welcome to the AARANYA Circle! ✦', '✉', 4000);
      email.value = '';
    }
  });

  // Init animations
  setTimeout(() => {
    initScrollReveal();
    initLazyImages();
  }, 50);
}

export function getHomeStyles() {
  return `
/* ═══════ HERO ══════════════════════════════════════════ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 140px;
  padding-bottom: var(--space-12);
  overflow: hidden;
  box-sizing: border-box;
}
.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 72% 35%;
  transition: transform 10s cubic-bezier(0.25, 1, 0.5, 1);
}
.hero:hover .hero__image {
  transform: scale(1.04);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: 
    linear-gradient(90deg, 
      rgba(14, 11, 9, 0.92) 0%, 
      rgba(16, 12, 10, 0.82) 36%, 
      rgba(20, 16, 13, 0.45) 65%, 
      rgba(20, 16, 13, 0.15) 100%
    ),
    linear-gradient(180deg, 
      rgba(14, 11, 9, 0.70) 0%, 
      rgba(14, 11, 9, 0.10) 30%, 
      rgba(14, 11, 9, 0.35) 70%, 
      rgba(14, 11, 9, 0.90) 100%
    );
}
.hero__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
  width: 100%;
}
.hero__text {
  max-width: 620px;
}
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 6px 16px;
  background: rgba(201, 169, 110, 0.14);
  border: 1px solid rgba(201, 169, 110, 0.4);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-champagne);
  font-weight: 500;
  backdrop-filter: blur(12px);
  width: fit-content;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  margin-bottom: var(--space-4);
}
.hero__badge-dot {
  color: var(--color-gold);
  font-size: 0.75rem;
}
.hero__title {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 5.2vw, 4.2rem);
  font-weight: 500;
  line-height: 1.14;
  letter-spacing: -0.01em;
  color: var(--color-ivory);
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.7);
  margin: 0 0 var(--space-4);
}
.hero__title-accent {
  font-style: italic;
  font-family: var(--font-serif);
  background: linear-gradient(135deg, #FFFDF8 0%, #E8CA7A 45%, #C9A96E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  padding-right: 4px;
}
.hero__desc {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.2vw, 1.12rem);
  line-height: 1.7;
  color: rgba(250, 247, 242, 0.92);
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.7);
  max-width: 540px;
  margin-bottom: var(--space-8);
  font-weight: 350;
}
.hero__actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  align-items: center;
}
.hero__btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, #DFBE7D 0%, #C9A96E 60%, #9F7B38 100%);
  color: #1A140E !important;
  font-weight: 600;
  letter-spacing: 0.06em;
  box-shadow: 0 6px 20px rgba(201, 169, 110, 0.35);
  transition: all var(--transition-base);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.hero__btn-primary:hover {
  background: linear-gradient(135deg, #FFFDF5 0%, #DFBE7D 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(201, 169, 110, 0.5);
}
.hero__btn-primary svg {
  transition: transform var(--transition-fast);
}
.hero__btn-primary:hover svg {
  transform: translateX(4px);
}
.hero__btn-secondary {
  border: 1.5px solid rgba(250, 247, 242, 0.55);
  color: var(--color-ivory);
  background: rgba(20, 16, 14, 0.4);
  backdrop-filter: blur(10px);
  letter-spacing: 0.06em;
  transition: all var(--transition-base);
}
.hero__btn-secondary:hover {
  background: rgba(250, 247, 242, 0.15);
  border-color: var(--color-champagne);
  color: var(--color-champagne);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
.hero__stats {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-7);
  background: rgba(18, 14, 12, 0.65);
  border: 1px solid rgba(201, 169, 110, 0.28);
  border-radius: var(--radius-md);
  backdrop-filter: blur(14px);
  width: fit-content;
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
}
.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.hero__stat-num {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-champagne);
  line-height: 1;
  text-shadow: 0 1px 6px rgba(0,0,0,0.4);
}
.hero__stat-label {
  font-size: 0.68rem;
  color: rgba(250,247,242,0.75);
  letter-spacing: 0.1em;
  margin-top: var(--space-1);
  text-transform: uppercase;
  font-weight: 500;
}
.hero__stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(201,169,110,0.25);
}
.hero__scroll {
  position: absolute;
  bottom: var(--space-6);
  right: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  z-index: 2;
}
.hero__scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, transparent, var(--color-gold));
  animation: scroll-pulse 2s ease-in-out infinite;
}
.hero__scroll-text {
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(250,247,242,0.6);
  writing-mode: vertical-lr;
}
@keyframes scroll-pulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.1); }
}

/* ═══════ TICKER ══════════════════════════════════════════ */
.ticker {
  background: var(--color-charcoal);
  border-top: 1px solid rgba(201,169,110,0.12);
  border-bottom: 1px solid rgba(201,169,110,0.12);
  overflow: hidden;
  padding: var(--space-3) 0;
}
.ticker__track {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  white-space: nowrap;
  animation: ticker-scroll 40s linear infinite;
}
.ticker__item {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(250,247,242,0.6);
}
.ticker__sep {
  color: var(--color-gold);
  font-size: var(--text-xs);
}
@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

/* ═══════ OCCASIONS GRID ══════════════════════════════════ */
.occasions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-10);
}
.occasion-card {
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 3/4;
  text-decoration: none;
  color: var(--color-ivory);
}
.occasion-card__image {
  position: absolute;
  inset: 0;
  transition: transform var(--transition-slow);
}
.occasion-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.occasion-card:hover .occasion-card__image { transform: scale(1.06); }
.occasion-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(30,26,23,0.85) 0%, rgba(30,26,23,0.2) 60%, transparent 100%);
  transition: opacity var(--transition-base);
}
.occasion-card:hover::after {
  background: linear-gradient(to top, var(--occ-color, rgba(30,26,23,0.9)) 0%, rgba(30,26,23,0.3) 70%, transparent 100%);
}
.occasion-card__body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-6);
  z-index: 1;
}
.occasion-card__title {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 500;
  line-height: 1.1;
}
.occasion-card__sub {
  font-size: var(--text-xs);
  color: rgba(250,247,242,0.7);
  margin-top: var(--space-1);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--transition-base), transform var(--transition-base);
}
.occasion-card__cta {
  display: inline-block;
  margin-top: var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  color: var(--color-gold);
  text-transform: uppercase;
  opacity: 0;
  transition: opacity var(--transition-base);
}
.occasion-card:hover .occasion-card__sub,
.occasion-card:hover .occasion-card__cta { opacity: 1; transform: translateY(0); }
.occasion-card:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

/* ═══════ PRODUCTS GRID ═══════════════════════════════════ */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* ═══════ PRODUCT CARD ════════════════════════════════════ */
.product-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}
.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
.product-card__image-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--color-cream);
}
.product-card__img {
  transition: transform var(--transition-slow);
  opacity: 0;
  transition: opacity 0.4s ease, transform var(--transition-slow);
}
.product-card__img.loaded { opacity: 1; }
.product-card:hover .product-card__img { transform: scale(1.05); }
.product-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(30,26,23,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}
.product-card:hover .product-card__overlay { opacity: 1; }
.product-card__quick-view {
  transform: translateY(8px);
  transition: transform var(--transition-spring);
}
.product-card:hover .product-card__quick-view { transform: translateY(0); }
.product-card__wishlist {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 36px;
  height: 36px;
  background: rgba(250,247,242,0.9);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background var(--transition-fast), transform var(--transition-spring);
  z-index: 2;
}
.product-card__wishlist:hover { transform: scale(1.1); }
.product-card__wishlist svg {
  width: 16px;
  height: 16px;
  stroke: var(--color-stone);
  fill: none;
  stroke-width: 1.5;
  transition: stroke var(--transition-fast), fill var(--transition-fast);
}
.product-card__wishlist.active svg {
  stroke: var(--color-burgundy-light);
  fill: var(--color-burgundy-light);
}
.product-card__badges {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  z-index: 2;
}
.product-card__body {
  padding: var(--space-4);
}
.product-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}
.product-card__material {
  font-size: var(--text-xs);
  color: var(--color-stone);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.product-card__rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.product-card__stars {
  color: var(--color-gold);
  font-size: var(--text-xs);
  letter-spacing: 1px;
}
.product-card__reviews {
  font-size: var(--text-xs);
  color: var(--color-stone-light);
}
.product-card__name {
  display: block;
  text-decoration: none;
  margin-bottom: var(--space-2);
}
.product-card__name h3 {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--color-charcoal);
  line-height: 1.25;
  transition: color var(--transition-fast);
}
.product-card__name:hover h3 { color: var(--color-gold-deep); }
.product-card__stones {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}
.product-card__stone {
  font-size: 0.65rem;
  padding: 1px 6px;
  background: var(--color-cream);
  color: var(--color-stone);
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
}
.product-card__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  flex-wrap: wrap;
}
.product-card__prices {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  flex-wrap: wrap;
}
.product-card__price {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-charcoal);
}
.product-card__original {
  font-size: var(--text-sm);
  color: var(--color-stone-light);
  text-decoration: line-through;
}
.product-card__add-btn {
  flex-shrink: 0;
  transition: background var(--transition-base), border-color var(--transition-base), color var(--transition-base);
}

/* ═══════ PROMISE BAND ════════════════════════════════════ */
.promise-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
}
.promise-item {
  text-align: center;
}
.promise-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: var(--space-3);
}
.promise-title {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  color: var(--color-ivory);
  margin-bottom: var(--space-2);
}
.promise-desc {
  font-size: var(--text-sm);
  color: rgba(250,247,242,0.55);
  line-height: 1.6;
}

/* ═══════ CRAFT SECTION ═══════════════════════════════════ */
.craft-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}
.craft-image-stack {
  position: relative;
  height: 600px;
}
.craft-img--main {
  width: 85%;
  height: 90%;
  object-fit: cover;
  border-radius: var(--radius-lg);
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: var(--shadow-xl);
}
.craft-img--accent {
  width: 50%;
  height: 260px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  position: absolute;
  bottom: 0;
  right: 0;
  box-shadow: var(--shadow-lg);
  border: 4px solid var(--color-ivory);
}
.craft-badge {
  position: absolute;
  top: var(--space-6);
  right: 0;
  background: var(--color-charcoal);
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: var(--radius-md);
  padding: var(--space-4) var(--space-5);
  text-align: center;
  box-shadow: var(--shadow-lg);
}
.craft-badge__num {
  display: block;
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  color: var(--color-gold);
  font-weight: 300;
  line-height: 1;
}
.craft-badge__text {
  display: block;
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250,247,242,0.6);
  margin-top: var(--space-1);
}
.craft-techniques {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-top: var(--space-6);
}
.craft-tech {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  padding-bottom: var(--space-5);
  border-bottom: 1px solid rgba(201,169,110,0.12);
}
.craft-tech:last-child { border-bottom: none; }
.craft-tech__icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
.craft-tech__name {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-1);
}
.craft-tech__desc {
  font-size: var(--text-sm);
  color: var(--color-stone);
  line-height: 1.6;
}

/* ═══════ TESTIMONIALS ════════════════════════════════════ */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.testimonial {
  background: rgba(250,247,242,0.04);
  border: 1px solid rgba(201,169,110,0.12);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}
.testimonial__stars {
  color: var(--color-gold);
  font-size: var(--text-lg);
  letter-spacing: 2px;
  display: block;
  margin-bottom: var(--space-4);
}
.testimonial__quote {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-style: italic;
  color: rgba(250,247,242,0.85);
  line-height: 1.7;
  margin-bottom: var(--space-6);
}
.testimonial__footer {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.testimonial__avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-gold);
  color: var(--color-charcoal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 600;
  flex-shrink: 0;
}
.testimonial__author {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ivory);
  font-style: normal;
  display: block;
}
.testimonial__location {
  font-size: var(--text-xs);
  color: rgba(250,247,242,0.45);
  letter-spacing: 0.05em;
  margin-top: 2px;
}

/* ═══════ LOOKBOOK GRID ═══════════════════════════════════ */

/* ═══════ LOOKBOOK GRID ═══════════════════════════════════ */
.lookbook-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1fr;
  grid-template-rows: repeat(2, 260px);
  gap: var(--space-3);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.lookbook-grid > .lookbook-item:first-child {
  grid-row: span 2;
}

.lookbook-item {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: #e9e0d2;
}

.lookbook-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: transform 0.6s ease, opacity 0.3s ease;
}

.lookbook-item:hover img {
  transform: scale(1.05);
}

.lookbook-item__overlay {
  position: absolute;
  inset: 0;
  background: rgba(30, 26, 23, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lookbook-item:hover .lookbook-item__overlay,
.lookbook-item:focus-within .lookbook-item__overlay {
  opacity: 1;
}

.lookbook-item__link {
  color: var(--color-ivory);
  font-size: var(--text-sm);
  text-align: center;
  letter-spacing: 0.04em;
  text-decoration: none;
  padding: 10px 16px;
  border: 1px solid rgba(250, 247, 242, 0.7);
  border-radius: var(--radius-full);
  background: rgba(30, 26, 23, 0.25);
}

.lookbook-item__link:hover {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-charcoal);
}

@media (max-width: 768px) {
  .lookbook-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(3, 220px);
  }

  .lookbook-grid > .lookbook-item:first-child {
    grid-row: auto;
  }
}

@media (max-width: 540px) {
  .lookbook-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(3, 175px);
    gap: 8px;
  }

  .lookbook-item__overlay {
    opacity: 1;
    background: linear-gradient(
      to top,
      rgba(30, 26, 23, 0.58),
      transparent 65%
    );
    align-items: flex-end;
  }

  .lookbook-item__link {
    font-size: 10px;
    padding: 7px 9px;
  }
}


/* ═══════ NEWSLETTER ══════════════════════════════════════ */
.ornament-diamond {
  display: block;
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
}
.newsletter-form {
  max-width: 480px;
  margin: 0 auto;
}
.newsletter-input-wrap {
  display: flex;
  gap: var(--space-2);
  background: rgba(250,247,242,0.08);
  border: 1px solid rgba(201,169,110,0.3);
  border-radius: var(--radius-sm);
  padding: var(--space-2);
}
.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-ivory);
  font-size: var(--text-base);
  padding: var(--space-1) var(--space-2);
}
.newsletter-input::placeholder { color: rgba(250,247,242,0.4); }

/* ═══════ RESPONSIVE ══════════════════════════════════════ */
@media (max-width: 1100px) {
  .occasions-grid { grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
  .products-grid  { grid-template-columns: repeat(2, 1fr); }
  .promise-grid   { grid-template-columns: repeat(2, 1fr); }
  .craft-inner    { grid-template-columns: 1fr; }
  .craft-image-stack { height: 400px; }
  .testimonials-grid { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .occasions-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .hero { 
    padding-top: 120px; 
    padding-bottom: var(--space-10);
    min-height: calc(100vh - 40px);
  }
  .hero__title { font-size: 2.35rem; }
  .hero__stats { 
    width: 100%;
    justify-content: space-around;
    padding: var(--space-3) var(--space-4);
  }
  .hero__scroll { display: none; }
  .occasions-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
  .products-grid { grid-template-columns: 1fr 1fr; gap: var(--space-4); }
  .promise-grid { grid-template-columns: 1fr 1fr; gap: var(--space-6); }
  .lookbook-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
  .lookbook-grid > :nth-child(1) { grid-row: span 1; }
}
@media (max-width: 540px) {
  .hero { padding-top: 110px; }
  .hero__title { font-size: 2.05rem; }
  .hero__actions { flex-direction: column; width: 100%; }
  .hero__actions .btn { width: 100%; text-align: center; justify-content: center; }
  .hero__stats { 
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
  .hero__stat-divider { display: none; }
  .occasions-grid { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: 1fr; }
  .promise-grid { grid-template-columns: 1fr; }
  .lookbook-grid { grid-template-columns: 1fr; }
}
`;
}
