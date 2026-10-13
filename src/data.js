
// =========================================================
// AARANYA — Product Data Store
// =========================================================

export const CATEGORIES = [
  { id: 'all', label: 'All Jewellery', icon: '✦' },
  { id: 'necklaces', label: 'Necklaces', icon: '◉' },
  { id: 'rings', label: 'Rings', icon: '○' },
  { id: 'earrings', label: 'Earrings', icon: '◈' },
  { id: 'bangles', label: 'Bangles & Cuffs', icon: '◎' },
  { id: 'bracelets', label: 'Bracelets', icon: '⬡' },
  { id: 'pendants', label: 'Pendants', icon: '◇' },
  { id: 'bridal', label: 'Bridal Sets', icon: '♛' },
  { id: 'everyday', label: 'Everyday Wear', icon: '✦' },
  { id: 'gemstones', label: 'Gemstone Luxury', icon: '💎' },
  { id: 'mens', label: "Men's Jewellery", icon: '❖' },
  { id: 'gifting', label: 'Gifting & Shagun', icon: '🎁' },
];

export const COLLECTIONS_LIST = [
  { id: 'gold', label: 'Gold Collection', filterType: 'material', filterVal: 'Gold' },
  { id: 'diamond', label: 'Diamond Jewellery', filterType: 'category', filterVal: 'diamond' },
  { id: 'platinum', label: 'Platinum Collection', filterType: 'material', filterVal: 'Platinum' },
  { id: 'bridal', label: 'Royal Bridal Trousseau', filterType: 'category', filterVal: 'bridal' },
  { id: 'everyday', label: 'Everyday Luxury', filterType: 'category', filterVal: 'everyday' },
  { id: 'gemstones', label: 'Precious Gemstones', filterType: 'category', filterVal: 'gemstones' },
  { id: 'mens', label: "Men's Regal Line", filterType: 'category', filterVal: 'mens' },
  { id: 'gifting', label: 'Gifting & Keepsakes', filterType: 'category', filterVal: 'gifting' },
];

export const OCCASIONS = [
  'Wedding',
  'Festive',
  'Everyday',
  'Party',
  'Office',
  'Gifting',
];

export const MATERIALS = [
  '22K Gold',
  '18K Gold',
  'Platinum',
  'Rose Gold',
  'Silver',
];

export const BUDGETS = [
  'Under ₹25,000',
  '₹25,000–₹75,000',
  '₹75,000–₹2,00,000',
  'Above ₹2,00,000',
];

// ---------------------------------------------------------
// Product images
// Main image references are preserved from your original file.
// ---------------------------------------------------------

const IMGS = {
  heroNecklace: '/images/hero-necklace.jpg',
  diamondRing: '/images/diamond-ring.jpg',
  bridalSet: '/images/bridal-set.jpg',
  goldBangles: '/images/gold-bangles.jpg',
  pearlEarrings: '/images/pearl-earrings.jpg',
  emeraldPendant: '/images/emerald-pendant.jpg',

  u1: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  u2: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
  u3: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
  u4: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  u5: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
  u6: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
  u7: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
  u8: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
  u9: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80',
  u10: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&q=80',
  u11: 'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=800&q=80',
  u12: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=800&q=80',

  mensRing: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  mensKada: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
  everydayMangalsutra: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
  everydayHoops: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80',
  sapphireRing: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
  rubyRaaniHaar: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
  golcondaChoker: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80',
  goldCoinPendant: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  shagunBracelet: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&q=80',
};

// ---------------------------------------------------------
// Products
// IMPORTANT:
// - Existing product IDs are preserved.
// - Existing product names are preserved.
// - Existing slugs are preserved.
// - Every gallery is intentionally empty.
// ---------------------------------------------------------

export const PRODUCTS = [
  {
    id: 'p001',
    name: 'Maharani Kundan Necklace',
    slug: 'maharani-kundan-necklace',
    category: 'necklaces',
    price: 185000,
    originalPrice: 220000,
    badge: 'Bestseller',
    material: '22K Gold',
    occasion: ['Wedding', 'Festive'],
    stones: ['Kundan', 'Ruby', 'Emerald', 'Pearl'],
    weight: '62g',
    purity: '22 Karat Gold',
    image: IMGS.heroNecklace,
    gallery: [],
    description: 'A statement Kundan necklace inspired by traditional Rajasthani jewellery. Its ornate gold framework, colourful gemstone accents and pearl detailing create a regal look for weddings and festive celebrations.',
    features: [
      'Traditional Kundan-inspired design',
      'Gold framework',
      'Gemstone and pearl detailing',
      'Gift box included',
      'Product details available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 4.9,
    reviews: 87,
  },

  {
    id: 'p002',
    name: 'Solitaire Diamond Ring',
    slug: 'solitaire-diamond-ring',
    category: 'rings',
    price: 95000,
    originalPrice: null,
    badge: 'New',
    material: 'Platinum',
    occasion: ['Wedding', 'Party'],
    stones: ['Diamond'],
    weight: '5g',
    purity: 'Pt 950',
    image: IMGS.diamondRing,
    gallery: [],
    description: 'A timeless solitaire-style ring featuring a brilliant centre stone and an elegant platinum setting. Its refined silhouette makes it suitable for engagements, anniversaries and special occasions.',
    features: [
      'Solitaire-inspired design',
      'Platinum setting',
      'Elegant polished finish',
      'Ring sizing assistance',
      'Certification details available on request',
    ],
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviews: 34,
  },

  {
    id: 'p003',
    name: 'Royal Bridal Jewellery Set',
    slug: 'royal-bridal-set',
    category: 'bridal',
    price: 425000,
    originalPrice: 490000,
    badge: 'Premium',
    material: '22K Gold',
    occasion: ['Wedding'],
    stones: ['Polki Diamond', 'Ruby', 'Pearl'],
    weight: '180g',
    purity: '22 Karat Gold',
    image: IMGS.bridalSet,
    gallery: [],
    description: 'A grand bridal jewellery ensemble featuring a statement necklace with coordinated traditional jewellery styling. Its ornate finish and rich detailing are designed to complement classic Indian bridal attire.',
    features: [
      'Bridal jewellery ensemble',
      'Traditional Polki-inspired styling',
      'Ruby and pearl detailing',
      'Customisation enquiry available',
      'Bridal presentation packaging',
    ],
    inStock: true,
    isNew: false,
    rating: 4.8,
    reviews: 22,
  },

  {
    id: 'p004',
    name: 'Rajputana Filigree Bangles',
    slug: 'rajputana-filigree-bangles',
    category: 'bangles',
    price: 65000,
    originalPrice: null,
    badge: null,
    material: '22K Gold',
    occasion: ['Festive', 'Wedding', 'Party'],
    stones: ['Emerald', 'Ruby'],
    weight: '48g',
    purity: '22 Karat Gold',
    image: IMGS.goldBangles,
    gallery: [],
    description: 'Traditional gold bangles featuring intricate filigree-inspired detailing and colourful gemstone accents. Their heritage-inspired design pairs beautifully with festive and wedding outfits.',
    features: [
      'Traditional filigree-inspired design',
      'Gold finish',
      'Gemstone accents',
      'Sizing enquiry available',
      'Product specifications available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 4.7,
    reviews: 56,
  },

  {
    id: 'p005',
    name: 'South Sea Pearl Drop Earrings',
    slug: 'south-sea-pearl-earrings',
    category: 'earrings',
    price: 42000,
    originalPrice: 52000,
    badge: 'Sale',
    material: '18K Gold',
    occasion: ['Party', 'Office', 'Wedding'],
    stones: ['South Sea Pearl', 'Diamond'],
    weight: '9g',
    purity: '18 Karat White Gold',
    image: IMGS.pearlEarrings,
    gallery: [],
    description: 'Elegant drop earrings styled with luminous pearl accents and a refined gold setting. Their graceful shape makes them a versatile choice for celebrations, formal occasions and evening wear.',
    features: [
      'Pearl drop design',
      'Gold setting',
      'Elegant drop silhouette',
      'Secure earring fastening',
      'Product specifications available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 4.8,
    reviews: 91,
  },

  {
    id: 'p006',
    name: 'Colombian Emerald Pendant',
    slug: 'colombian-emerald-pendant',
    category: 'pendants',
    price: 78000,
    originalPrice: null,
    badge: 'New',
    material: '18K Gold',
    occasion: ['Party', 'Festive', 'Office'],
    stones: ['Emerald', 'Diamond'],
    weight: '12g',
    purity: '18 Karat Yellow Gold',
    image: IMGS.emeraldPendant,
    gallery: [],
    description: 'A statement pendant featuring an emerald-inspired centre stone framed by sparkling accent stones in a classic gold setting. Its rich green colour and elegant proportions make it suitable for both special occasions and refined everyday styling.',
    features: [
      'Emerald-centred design',
      'Gold setting',
      'Decorative accent stones',
      'Chain details to be confirmed',
      'Stone certification details available on request',
    ],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviews: 18,
  },

  {
    id: 'p007',
    name: 'Diamond Tennis Bracelet',
    slug: 'diamond-tennis-bracelet',
    category: 'bracelets',
    price: 135000,
    originalPrice: null,
    badge: null,
    material: '18K Gold',
    occasion: ['Party', 'Wedding', 'Office'],
    stones: ['Diamond', 'Sapphire'],
    weight: '14g',
    purity: '18 Karat White Gold',
    image: IMGS.u1,
    gallery: [],
    description: 'A sleek tennis-style bracelet featuring a continuous line of sparkling stones. Its streamlined design makes it easy to style alone or alongside a watch and other fine bracelets.',
    features: [
      'Tennis-style design',
      'Gold setting',
      'Continuous stone detailing',
      'Secure clasp design',
      'Stone specifications available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 4.7,
    reviews: 41,
  },

  {
    id: 'p008',
    name: 'Jadau gemstone pendant necklace',
    slug: 'jadau-gold-jhumka-earrings',
    category: 'pendants',
    price: 38000,
    originalPrice: null,
    badge: null,
    material: '22K Gold',
    occasion: ['Festive', 'Wedding', 'Party'],
    stones: ['Kundan', 'Pearl'],
    weight: '22g',
    purity: '22 Karat Gold',
    image: IMGS.u3,
    gallery: [],
    description: 'A Jadau-inspired pendant necklace featuring a decorative gemstone centre and a gold-toned setting. Traditional styling gives this piece a distinctive look for festive occasions and ethnic outfits.',
    features: [
      'Jadau-inspired styling',
      'Decorative gemstone setting',
      'Gold-toned design',
      'Traditional occasion wear',
      'Pendant and chain details available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 4.6,
    reviews: 73,
  },

  {
    id: 'p009',
    name: 'Rose Gold Diamond Eternity Ring',
    slug: 'rose-gold-eternity-ring',
    category: 'rings',
    price: 55000,
    originalPrice: 68000,
    badge: 'Sale',
    material: 'Rose Gold',
    occasion: ['Wedding', 'Party', 'Everyday'],
    stones: ['Diamond'],
    weight: '4g',
    purity: '18K Rose Gold',
    image: IMGS.u4,
    gallery: [],
    description: 'A refined eternity-style ring featuring a row of sparkling stones set against a warm rose gold finish. Wear it alone for understated elegance or stack it with other rings for a layered look.',
    features: [
      'Eternity-style design',
      'Rose gold finish',
      'Decorative stone setting',
      'Suitable for stacking',
      'Ring sizing assistance',
    ],
    inStock: true,
    isNew: false,
    rating: 4.8,
    reviews: 62,
  },

  {
    id: 'p010',
    name: 'Diamond bangle',
    slug: 'navratna-gold-necklace',
    category: 'bangles',
    price: 112000,
    originalPrice: null,
    badge: null,
    material: '22K Gold',
    occasion: ['Festive', 'Wedding'],
    stones: ['Diamond'],
    weight: '38g',
    purity: '22 Karat Gold',
    image: IMGS.u6,
    gallery: [],
    description: 'A statement bangle featuring a sculptural silhouette and a sparkling diamond-style finish. Its elegant design brings a touch of glamour to festive outfits, evening wear and special celebrations.',
    features: [
      'Statement bangle design',
      'Gold setting',
      'Sparkling stone detailing',
      'Festive and occasion wear',
      'Sizing and stone details available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 4.7,
    reviews: 29,
  },

  {
    id: 'p011',
    name: 'Celestial-themed multi-layered gold necklace set.',
    slug: 'geometric-diamond-ear-cuff',
    category: 'necklaces',
    price: 28000,
    originalPrice: null,
    badge: 'New',
    material: '18K Gold',
    occasion: ['Party', 'Office'],
    stones: ['Diamond'],
    weight: '6g',
    purity: '18K Yellow Gold',
    image: IMGS.u12,
    gallery: [],
    description: 'A contemporary multi-layered necklace set with celestial-inspired styling and a polished gold look. Its layered appearance creates a modern statement while remaining easy to pair with both casual and occasion outfits.',
    features: [
      'Multi-layered necklace styling',
      'Celestial-inspired design',
      'Gold finish',
      'Contemporary look',
      'Length and stone details available on request',
    ],
    inStock: true,
    isNew: true,
    rating: 4.5,
    reviews: 15,
  },

  {
    id: 'p012',
    name: ' Vintage-style geometric  earrings',
    slug: 'antique-polki-choker',
    category: 'earrings',
    price: 195000,
    originalPrice: null,
    badge: 'Exclusive',
    material: '22K Gold',
    occasion: ['Wedding', 'Festive'],
    stones: ['Crystal'],
    weight: '75g',
    purity: '22 Karat Gold',
    image: IMGS.u8,
    gallery: [],
    description: 'A pair of vintage-inspired geometric drop earrings featuring contrasting blue and light-toned decorative stones. Their statement silhouette adds colour and character to traditional and contemporary outfits.',
    features: [
      'Geometric drop design',
      'Vintage-inspired styling',
      'Blue and light-toned accents',
      'Statement earring silhouette',
      'Material and stone details available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 5.0,
    reviews: 8,
  },

  {
    id: 'p013',
    name: "Royal Navratna Men's Signet Ring",
    slug: 'royal-navratna-mens-signet-ring',
    category: 'mens',
    price: 88000,
    originalPrice: 98000,
    badge: "Men's Line",
    material: '18K Gold',
    occasion: ['Wedding', 'Festive', 'Party'],
    stones: ['Emerald', 'Ruby', 'Diamond'],
    weight: '16g',
    purity: '18 Karat Yellow Gold',
    image: IMGS.mensRing,
    gallery: [],
    description: 'A bold signet-style ring with a substantial profile and traditional-inspired detailing. Its distinctive look makes it suitable for celebrations, formal occasions and statement everyday styling.',
    features: [
      'Signet-style design',
      'Gold finish',
      'Decorative centre setting',
      'Statement profile',
      'Ring sizing assistance',
    ],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviews: 14,
  },

  {
    id: 'p014',
    name: 'Imperial Platinum & 22K Gold Kada',
    slug: 'imperial-platinum-gold-kada',
    category: 'mens',
    price: 165000,
    originalPrice: null,
    badge: 'Heritage',
    material: 'Platinum',
    occasion: ['Wedding', 'Festive', 'Everyday'],
    stones: [],
    weight: '52g',
    purity: 'Pt 950 & 22K Gold Inlay',
    image: IMGS.mensKada,
    gallery: [],
    description: 'A bold men’s kada combining a dual-tone look with traditional-inspired detailing. Its substantial silhouette and polished finish make it suitable for festive occasions as well as statement everyday wear.',
    features: [
      'Men’s kada design',
      'Dual-tone styling',
      'Gold detailing',
      'Polished finish',
      'Wrist sizing enquiry available',
    ],
    inStock: true,
    isNew: false,
    rating: 4.9,
    reviews: 21,
  },

  {
    id: 'p015',
    name: 'Jadau gemstone pendant necklace',
    slug: 'aura-minimalist-solitaire-mangalsutra',
    category: 'everyday',
    price: 49000,
    originalPrice: 56000,
    badge: 'Bestseller',
    material: '18K Gold',
    occasion: ['Everyday', 'Office'],
    stones: ['Diamond'],
    weight: '4.8g',
    purity: '18 Karat Yellow Gold',
    image: IMGS.everydayMangalsutra,
    gallery: [],
    description: 'A modern mangalsutra design that brings traditional styling into a minimalist silhouette. Its delicate chain and understated centre detail make it suitable for everyday wear and work outfits.',
    features: [
      'Minimalist mangalsutra design',
      'Gold chain styling',
      'Subtle centre detail',
      'Everyday-friendly look',
      'Length and stone details available on request',
    ],
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviews: 47,
  },

  {
    id: 'p016',
    name: 'Petite Pavé Diamond Huggie Hoops',
    slug: 'petite-pave-diamond-huggie-hoops',
    category: 'everyday',
    price: 32000,
    originalPrice: null,
    badge: 'Everyday',
    material: 'Rose Gold',
    occasion: ['Everyday', 'Office', 'Party'],
    stones: ['Diamond'],
    weight: '3.6g',
    purity: '18 Karat Rose Gold',
    image: IMGS.everydayHoops,
    gallery: [],
    description: 'Petite huggie-style hoop earrings with a refined silhouette and sparkling pavé-inspired detailing. Their compact design makes them an easy choice for everyday styling, workwear and evening outfits.',
    features: [
      'Petite huggie hoop design',
      'Rose gold finish',
      'Pavé-inspired detailing',
      'Compact silhouette',
      'Closure and sizing details available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 4.8,
    reviews: 38,
  },

  {
    id: 'p017',
    name: 'Vintage-style geometric earrings',
    slug: 'royal-kashmir-blue-sapphire-ring',
    category: 'gemstones',
    price: 210000,
    originalPrice: 245000,
    badge: 'Exclusive',
    material: 'Platinum',
    occasion: ['Party', 'Wedding'],
    stones: ['Sapphire', 'Diamond'],
    weight: '8.4g',
    purity: 'Pt 950',
    image: IMGS.sapphireRing,
    gallery: [],
    description: 'A striking cocktail ring featuring a deep blue sapphire-style centre stone framed by sparkling accent details. Its bold colour and elegant setting make it a standout choice for formal events and special occasions.',
    features: [
      'Blue sapphire-style centre',
      'Platinum setting',
      'Decorative accent stones',
      'Statement cocktail ring design',
      'Gemstone certification details available on request',
    ],
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviews: 11,
  },

  {
    id: 'p018',
    name: 'Gold twisted rope hoop earrings',
    slug: 'burmese-ruby-polki-heritage-raani-haar',
    category: 'earrings',
    price: null,
    isEnquireOnly: true,
    originalPrice: null,
    badge: 'High Value Heirloom',
    material: '22K Gold',
    occasion: ['Wedding', 'Festive'],
    stones: [],
    weight: '142g',
    purity: '22 Karat Gold',
    image: IMGS.rubyRaaniHaar,
    gallery: [],
    description: 'Bold rope-style hoop earrings featuring an interwoven twist motif. The textured silhouette gives these gold earrings a sculptural appearance that pairs well with festive and traditional outfits.',
    features: [
      'Twisted rope-style design',
      'Hoop earring silhouette',
      'Gold finish',
      'Statement occasion wear',
      'Price and product specifications available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 5.0,
    reviews: 6,
  },

  {
    id: 'p019',
    name: ' Diamond open heart pendant necklace',
    slug: 'nizam-golconda-diamond-basra-pearl-choker',
    category: 'pendants',
    price: null,
    isEnquireOnly: true,
    originalPrice: null,
    badge: 'Bespoke Masterpiece',
    material: '22K Gold',
    occasion: ['Wedding'],
    stones: ['Diamond'],
    weight: '198g',
    purity: '22 Karat Gold',
    image: IMGS.golcondaChoker,
    gallery: [],
    description: 'A contemporary open-heart pendant necklace with a delicate heart-shaped outline and sparkling stone detailing. Its romantic design makes it suitable for wedding celebrations, anniversaries and meaningful gifts.',
    features: [
      'Open-heart pendant design',
      'Diamond-style detailing',
      'Gold setting',
      'Romantic statement styling',
      'Price and product specifications available on request',
    ],
    inStock: true,
    isNew: false,
    rating: 5.0,
    reviews: 4,
  },

  {
    id: 'p020',
    name: 'Shagun Lakshmi 24K Pure Gold Coin Pendant',
    slug: 'shagun-lakshmi-24k-gold-coin-pendant',
    category: 'gifting',
    price: 36000,
    originalPrice: 40000,
    badge: 'Auspicious Gift',
    material: '22K Gold',
    occasion: ['Festive', 'Wedding', 'Gifting'],
    stones: ['Ruby'],
    weight: '6.5g',
    purity: '24K Coin (999) & 22K Frame',
    image: IMGS.goldCoinPendant,
    gallery: [],
    description: 'A traditional coin pendant designed for auspicious gifting and festive occasions. Its coin-inspired centre and decorative gold frame give it a classic look for celebrations, family milestones and special presents.',
    features: [
      'Coin-style pendant',
      'Decorative gold frame',
      'Traditional gifting design',
      'Gift presentation',
      'Gold purity and hallmark details should be verified before publication',
    ],
    inStock: true,
    isNew: false,
    rating: 4.9,
    reviews: 52,
  },

  {
    id: 'p021',
    name: 'Three-tier interlocking gold ring',
    slug: 'twin-lotus-pearl-diamond-bracelet',
    category: 'rings',
    price: 58000,
    originalPrice: null,
    badge: 'New',
    material: '18K Gold',
    occasion: ['Gifting', 'Everyday', 'Party'],
    stones: [],
    weight: '8.2g',
    purity: '18 Karat Yellow Gold',
    image: IMGS.shagunBracelet,
    gallery: [],
    description: 'A contemporary ring featuring three interlocking gold bands that create a layered, dimensional look. Its sculptural design makes it a distinctive addition to a jewellery collection or a thoughtful gift for a special occasion.',
    features: [
      'Three-tier interlocking design',
      'Gold finish',
      'Layered sculptural appearance',
      'Suitable for gifting',
      'Ring sizing assistance',
    ],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviews: 29,
  },
];

// ---------------------------------------------------------
// Safe browser storage helpers
// ---------------------------------------------------------

function readStorage(key) {
  if (typeof window === 'undefined') return [];

  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to save ${key}:`, error);
  }
}

function dispatchStoreEvent(eventName, detail) {
  if (typeof document === 'undefined') return;

  document.dispatchEvent(
    new CustomEvent(eventName, { detail })
  );
}

// ---------------------------------------------------------
// Cart & Wishlist Store
// ---------------------------------------------------------

export const store = {
  cart: readStorage('aaranya_cart'),
  wishlist: readStorage('aaranya_wishlist'),

  saveCart() {
    writeStorage('aaranya_cart', this.cart);
    dispatchStoreEvent('cart:updated', this.cart);
  },

  saveWishlist() {
    writeStorage('aaranya_wishlist', this.wishlist);
    dispatchStoreEvent('wishlist:updated', this.wishlist);
  },

  addToCart(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product || product.isEnquireOnly || product.price == null) {
      return false;
    }

    if (!Number.isFinite(qty) || qty <= 0) {
      return false;
    }

    const existing = this.cart.find(item => item.id === productId);

    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({ id: productId, qty });
    }

    this.saveCart();
    return true;
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  },

  updateCartQty(productId, qty) {
    const item = this.cart.find(item => item.id === productId);

    if (!item) return;

    if (!Number.isFinite(qty) || qty <= 0) {
      this.removeFromCart(productId);
      return;
    }

    item.qty = qty;
    this.saveCart();
  },

  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);

    if (idx >= 0) {
      this.wishlist.splice(idx, 1);
    } else {
      this.wishlist.push(productId);
    }

    this.saveWishlist();
    return idx < 0;
  },

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  },

  cartTotal() {
    return this.cart.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);

      if (!product || product.price == null) return sum;

      return sum + product.price * item.qty;
    }, 0);
  },

  cartCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  },
};

// ---------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------

export function formatPrice(amount) {
  if (
    amount === null ||
    amount === undefined ||
    !Number.isFinite(Number(amount))
  ) {
    return 'Price on Request';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export function getProductById(id) {
  return PRODUCTS.find(product => product.id === id);
}

export function getProductBySlug(slug) {
  return PRODUCTS.find(product => product.slug === slug);
}

// ---------------------------------------------------------
// Product filtering
// Supports category IDs and collection IDs.
// ---------------------------------------------------------

export function filterProducts({
  category = 'all',
  occasion = null,
  material = null,
  minPrice = 0,
  maxPrice = Infinity,
  search = '',
} = {}) {
  return PRODUCTS.filter(product => {
    // Category and collection filters
    if (category !== 'all') {
      if (category === 'bridal') {
        if (
          product.category !== 'bridal' &&
          !product.occasion.includes('Wedding')
        ) {
          return false;
        }
      } else if (category === 'everyday') {
        if (
          product.category !== 'everyday' &&
          !product.occasion.includes('Everyday')
        ) {
          return false;
        }
      } else if (category === 'gifting') {
        if (
          product.category !== 'gifting' &&
          !product.occasion.includes('Gifting')
        ) {
          return false;
        }
      } else if (category === 'gemstones') {
        const gemstoneNames = [
          'Emerald',
          'Ruby',
          'Sapphire',
          'Pearl',
          'Navratna',
          'Kundan',
          'Polki Diamond',
          'Crystal',
        ];

        if (
          product.category !== 'gemstones' &&
          !product.stones.some(stone => gemstoneNames.includes(stone))
        ) {
          return false;
        }
      } else if (category === 'mens') {
        if (product.category !== 'mens') return false;
      } else if (category === 'gold') {
        if (!product.material.toLowerCase().includes('gold')) return false;
      } else if (category === 'diamond') {
        if (
          !product.stones.some(stone =>
            stone.toLowerCase().includes('diamond')
          )
        ) {
          return false;
        }
      } else if (category === 'platinum') {
        if (!product.material.toLowerCase().includes('platinum')) {
          return false;
        }
      } else if (product.category !== category) {
        return false;
      }
    }

    // Occasion filter
    if (occasion && !product.occasion.includes(occasion)) {
      return false;
    }

    // Material filter
    if (
      material &&
      !product.material.toLowerCase().includes(material.toLowerCase()) &&
      !product.purity.toLowerCase().includes(material.toLowerCase())
    ) {
      return false;
    }

    // Price filter
    // Enquiry-only products have no fixed price, so they are not
    // excluded by numeric price limits.
    if (product.price !== null && product.price !== undefined) {
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    // Search filter
    if (search.trim()) {
      const query = search.trim().toLowerCase();

      const searchableText = [
        product.name,
        product.description,
        product.stones.join(' '),
        product.material,
        product.category,
        product.slug,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
}
