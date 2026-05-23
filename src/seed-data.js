// Script to seed racing motorcycle data into Strapi
const categories = [
  {
    name: 'Racing Helmets',
    slug: 'racing-helmets',
    description: 'Professional racing helmets for maximum safety and aerodynamics',
    order: 1
  },
  {
    name: 'Racing Suits',
    slug: 'racing-suits',
    description: 'High-performance racing suits with advanced protection',
    order: 2
  },
  {
    name: 'Performance Exhaust',
    slug: 'performance-exhaust',
    description: 'Racing exhaust systems for maximum power output',
    order: 3
  },
  {
    name: 'Racing Tires',
    slug: 'racing-tires',
    description: 'Professional racing slicks and track day tires',
    order: 4
  },
  {
    name: 'Suspension Systems',
    slug: 'suspension-systems',
    description: 'Advanced racing suspension components and upgrades',
    order: 5
  }
];

// Category image URLs for reference (to be added manually in admin)
const categoryImages = {
  'racing-helmets': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'racing-suits': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
  'performance-exhaust': 'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80',
  'racing-tires': 'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
  'suspension-systems': 'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80'
};

const products = [
  {
    name: 'AGV Pista GP RR Racing Helmet',
    slug: 'agv-pista-gp-rr-helmet',
    description: 'Top-tier racing helmet used by MotoGP professionals. Features carbon fiber shell and advanced aerodynamics.',
    shortDescription: 'Professional MotoGP racing helmet with carbon fiber construction',
    price: 125000,
    salePrice: 115000,
    currency: 'LKR',
    brand: 'AGV',
    sku: 'AGV-PISTA-001',
    inStock: true,
    stockQuantity: 15,
    featured: true,
    isNew: true,
    isBestSeller: true,
    rating: 5,
    reviewCount: 47,
    category: 'racing-helmets',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'
    ],
    specifications: [
      { key: 'Shell Material', value: 'Carbon Fiber' },
      { key: 'Weight', value: '1350g' },
      { key: 'Safety Rating', value: 'ECE 22.06, DOT' },
      { key: 'Visor', value: 'Anti-scratch, Anti-fog' }
    ],
    tags: ['racing', 'motogp', 'carbon-fiber', 'premium']
  },
  {
    name: 'Shoei X-Spirit III Racing Helmet',
    slug: 'shoei-x-spirit-iii-helmet',
    description: 'Premium racing helmet with exceptional ventilation and aerodynamic stability at high speeds.',
    shortDescription: 'Professional racing helmet with superior aerodynamics',
    price: 98000,
    currency: 'LKR',
    brand: 'Shoei',
    sku: 'SHOEI-XS3-001',
    inStock: true,
    stockQuantity: 20,
    featured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 35,
    category: 'racing-helmets',
    images: [
      'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80',
      'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80'
    ],
    specifications: [
      { key: 'Shell Material', value: 'AIM+ Composite' },
      { key: 'Weight', value: '1400g' },
      { key: 'Safety Rating', value: 'ECE 22.05, SNELL' },
      { key: 'Ventilation', value: '8 intake, 6 exhaust' }
    ],
    tags: ['racing', 'track', 'premium', 'aerodynamic']
  },
  {
    name: 'Alpinestars GP Tech V3 Racing Suit',
    slug: 'alpinestars-gp-tech-v3-suit',
    description: 'One-piece leather racing suit with Tech-Air compatible. Race-proven protection and flexibility.',
    shortDescription: 'Professional one-piece racing suit with airbag compatibility',
    price: 285000,
    salePrice: 265000,
    currency: 'LKR',
    brand: 'Alpinestars',
    sku: 'ALP-GPT3-001',
    inStock: true,
    stockQuantity: 8,
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 28,
    category: 'racing-suits',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    ],
    specifications: [
      { key: 'Material', value: '1.3mm Premium Leather' },
      { key: 'Protection', value: 'CE Level 2 Armor' },
      { key: 'Tech-Air', value: 'Compatible' },
      { key: 'Stretch Panels', value: 'Dynamic Friction Shield' }
    ],
    tags: ['racing', 'leather', 'airbag', 'protection']
  },
  {
    name: 'Dainese Misano 2 D-Air Racing Suit',
    slug: 'dainese-misano-2-dair-suit',
    description: 'Professional racing suit with integrated D-Air airbag system. Maximum protection for track use.',
    shortDescription: 'Race suit with integrated airbag protection system',
    price: 320000,
    currency: 'LKR',
    brand: 'Dainese',
    sku: 'DAI-MIS2-001',
    inStock: true,
    stockQuantity: 5,
    featured: true,
    isBestSeller: false,
    rating: 5,
    reviewCount: 19,
    category: 'racing-suits',
    images: [
      'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80',
      'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80'
    ],
    specifications: [
      { key: 'Material', value: 'Premium Leather + Microfiber' },
      { key: 'Protection', value: 'D-Air Airbag Integrated' },
      { key: 'Armor', value: 'CE Level 2' },
      { key: 'Weight', value: '5.2kg (with D-Air)' }
    ],
    tags: ['racing', 'airbag', 'premium', 'dainese']
  },
  {
    name: 'Akrapovic Racing Titanium Exhaust',
    slug: 'akrapovic-racing-titanium-exhaust',
    description: 'Full racing exhaust system made from titanium. Significant weight reduction and power increase.',
    shortDescription: 'Titanium racing exhaust for maximum performance',
    price: 185000,
    salePrice: 175000,
    currency: 'LKR',
    brand: 'Akrapovic',
    sku: 'AKR-TIT-001',
    inStock: true,
    stockQuantity: 12,
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 62,
    category: 'performance-exhaust',
    images: [
      'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'
    ],
    specifications: [
      { key: 'Material', value: 'Grade 1 Titanium' },
      { key: 'Power Increase', value: '+8.5 HP' },
      { key: 'Weight Reduction', value: '-4.2 kg' },
      { key: 'Sound Level', value: 'Racing (105-110 dB)' }
    ],
    tags: ['exhaust', 'titanium', 'performance', 'racing']
  },
  {
    name: 'SC Project Full System Exhaust',
    slug: 'sc-project-full-system-exhaust',
    description: 'Complete racing exhaust system with carbon fiber silencer. Used in WorldSBK championship.',
    shortDescription: 'WorldSBK racing exhaust with carbon fiber',
    price: 165000,
    currency: 'LKR',
    brand: 'SC Project',
    sku: 'SCP-FULL-001',
    inStock: true,
    stockQuantity: 10,
    featured: false,
    isNew: true,
    rating: 4.7,
    reviewCount: 41,
    category: 'performance-exhaust',
    images: [
      'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
      'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80'
    ],
    specifications: [
      { key: 'Material', value: 'Stainless Steel + Carbon' },
      { key: 'Power Increase', value: '+7.2 HP' },
      { key: 'Weight Reduction', value: '-3.8 kg' },
      { key: 'Homologation', value: 'Track Only' }
    ],
    tags: ['exhaust', 'carbon', 'racing', 'worldsbk']
  },
  {
    name: 'Pirelli Diablo Supercorsa SP V4 Tires',
    slug: 'pirelli-diablo-supercorsa-sp-v4',
    description: 'Dual-compound racing tire for track days and aggressive street riding. Excellent grip and consistency.',
    shortDescription: 'Track-focused racing tire with dual compound',
    price: 45000,
    currency: 'LKR',
    brand: 'Pirelli',
    sku: 'PIR-DSC-001',
    inStock: true,
    stockQuantity: 30,
    featured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 89,
    category: 'racing-tires',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80'
    ],
    specifications: [
      { key: 'Compound', value: 'Dual Compound' },
      { key: 'Type', value: 'Track/Aggressive Street' },
      { key: 'Sizes Available', value: '120/70-17, 200/55-17' },
      { key: 'Warm-up Time', value: '2-3 laps' }
    ],
    tags: ['tires', 'pirelli', 'track', 'racing']
  },
  {
    name: 'Michelin Power Slick 2 Racing Tires',
    slug: 'michelin-power-slick-2',
    description: 'Pure racing slick tire for track use. Maximum grip and heat resistance for competitive racing.',
    shortDescription: 'Professional racing slick for maximum grip',
    price: 52000,
    currency: 'LKR',
    brand: 'Michelin',
    sku: 'MCH-PS2-001',
    inStock: true,
    stockQuantity: 25,
    featured: true,
    isNew: true,
    rating: 5,
    reviewCount: 54,
    category: 'racing-tires',
    images: [
      'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'
    ],
    specifications: [
      { key: 'Compound', value: 'Single Racing Compound' },
      { key: 'Type', value: 'Track Only (Slick)' },
      { key: 'Sizes Available', value: '120/70-17, 190/55-17' },
      { key: 'Operating Temp', value: '80-120°C' }
    ],
    tags: ['tires', 'slick', 'racing', 'michelin']
  },
  {
    name: 'Ohlins TTX GP Rear Shock',
    slug: 'ohlins-ttx-gp-rear-shock',
    description: 'MotoGP-derived rear shock absorber. Fully adjustable with racing-grade performance.',
    shortDescription: 'MotoGP technology rear shock absorber',
    price: 195000,
    currency: 'LKR',
    brand: 'Ohlins',
    sku: 'OHL-TTX-001',
    inStock: true,
    stockQuantity: 6,
    featured: false,
    isNew: false,
    rating: 4.9,
    reviewCount: 31,
    category: 'suspension-systems',
    images: [
      'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80'
    ],
    specifications: [
      { key: 'Type', value: 'TTX GP Twin-Tube' },
      { key: 'Adjustments', value: 'Compression/Rebound/Preload' },
      { key: 'Material', value: 'Aluminum/Steel' },
      { key: 'Compatibility', value: 'Most Sport Bikes' }
    ],
    tags: ['suspension', 'ohlins', 'racing', 'motogp']
  },
  {
    name: 'KYB Racing Front Fork Kit',
    slug: 'kyb-racing-front-fork-kit',
    description: 'Complete front fork upgrade kit with racing internals. Improved damping and adjustability.',
    shortDescription: 'Racing fork kit with improved damping',
    price: 145000,
    currency: 'LKR',
    brand: 'KYB',
    sku: 'KYB-FORK-001',
    inStock: true,
    stockQuantity: 8,
    featured: false,
    isNew: true,
    rating: 4.7,
    reviewCount: 23,
    category: 'suspension-systems',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80'
    ],
    specifications: [
      { key: 'Type', value: 'Racing Cartridge Kit' },
      { key: 'Adjustments', value: 'Compression/Rebound' },
      { key: 'Oil Included', value: 'Yes (Racing Grade)' },
      { key: 'Spring Rate', value: 'Adjustable' }
    ],
    tags: ['suspension', 'fork', 'racing', 'kyb']
  }
];

module.exports = {
  categories,
  products
};
