import type { Core } from '@strapi/strapi';

const categories = [
  {
    name: 'Racing Helmets',
    slug: 'racing-helmets',
    description: 'Professional racing helmets for maximum safety and aerodynamics',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    order: 1,
  },
  {
    name: 'Racing Suits',
    slug: 'racing-suits',
    description: 'High-performance racing suits with advanced protection',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    order: 2,
  },
  {
    name: 'Performance Exhaust',
    slug: 'performance-exhaust',
    description: 'Racing exhaust systems for maximum power output',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80',
    order: 3,
  },
  {
    name: 'Racing Tires',
    slug: 'racing-tires',
    description: 'Professional racing slicks and track day tires',
    imageUrl: 'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
    order: 4,
  },
  {
    name: 'Suspension Systems',
    slug: 'suspension-systems',
    description: 'Advanced racing suspension components and upgrades',
    imageUrl: 'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80',
    order: 5,
  },
  {
    name: 'Racing Gloves',
    slug: 'racing-gloves',
    description: 'Premium racing gloves for ultimate grip and protection',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    order: 6,
  },
  {
    name: 'Racing Boots',
    slug: 'racing-boots',
    description: 'Professional racing boots with maximum ankle support',
    imageUrl: 'https://images.unsplash.com/photo-1603808033587-8d49e51a573f?w=800&q=80',
    order: 7,
  },
  {
    name: 'Performance Brakes',
    slug: 'performance-brakes',
    description: 'High-performance brake systems for racing',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    order: 8,
  },
];

const products = [
  {
    name: 'AGV Pista GP RR Racing Helmet',
    slug: 'agv-pista-gp-rr-helmet',
    description: 'Top-tier racing helmet used by MotoGP professionals. Features carbon fiber shell and advanced aerodynamics for maximum performance at high speeds.',
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
    categorySlug: 'racing-helmets',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    specifications: [
      { key: 'Shell Material', value: 'Carbon Fiber' },
      { key: 'Weight', value: '1350g' },
      { key: 'Safety Rating', value: 'ECE 22.06, DOT' },
      { key: 'Visor', value: 'Anti-scratch, Anti-fog' },
    ],
    tags: ['racing', 'motogp', 'carbon-fiber', 'premium'],
  },
  {
    name: 'Shoei X-Spirit III Racing Helmet',
    slug: 'shoei-x-spirit-iii-helmet',
    description: 'Premium racing helmet with exceptional ventilation and aerodynamic stability at high speeds. Designed for professional track use.',
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
    categorySlug: 'racing-helmets',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    specifications: [
      { key: 'Shell Material', value: 'AIM+ Composite' },
      { key: 'Weight', value: '1400g' },
      { key: 'Safety Rating', value: 'ECE 22.05, SNELL' },
      { key: 'Ventilation', value: '8 intake, 6 exhaust' },
    ],
    tags: ['racing', 'track', 'premium', 'aerodynamic'],
  },
  {
    name: 'Alpinestars GP Tech V3 Racing Suit',
    slug: 'alpinestars-gp-tech-v3-suit',
    description: 'One-piece leather racing suit with Tech-Air compatible. Race-proven protection and flexibility for professional riders.',
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
    categorySlug: 'racing-suits',
    imageUrl: 'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80',
    specifications: [
      { key: 'Material', value: '1.3mm Premium Leather' },
      { key: 'Protection', value: 'CE Level 2 Armor' },
      { key: 'Tech-Air', value: 'Compatible' },
      { key: 'Stretch Panels', value: 'Dynamic Friction Shield' },
    ],
    tags: ['racing', 'leather', 'airbag', 'protection'],
  },
  {
    name: 'Dainese Misano 2 D-Air Racing Suit',
    slug: 'dainese-misano-2-dair-suit',
    description: 'Professional racing suit with integrated D-Air airbag system. Maximum protection for track use with advanced materials.',
    shortDescription: 'Race suit with integrated airbag protection system',
    price: 320000,
    currency: 'LKR',
    brand: 'Dainese',
    sku: 'DAI-MIS2-001',
    inStock: true,
    stockQuantity: 5,
    featured: true,
    rating: 5,
    reviewCount: 19,
    categorySlug: 'racing-suits',
    imageUrl: 'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'Premium Leather + Microfiber' },
      { key: 'Protection', value: 'D-Air Airbag Integrated' },
      { key: 'Armor', value: 'CE Level 2' },
      { key: 'Weight', value: '5.2kg (with D-Air)' },
    ],
    tags: ['racing', 'airbag', 'premium', 'dainese'],
  },
  {
    name: 'Akrapovic Racing Titanium Exhaust',
    slug: 'akrapovic-racing-titanium-exhaust',
    description: 'Full racing exhaust system made from titanium. Significant weight reduction and power increase for competitive racing.',
    shortDescription: 'Titanium racing exhaust for maximum performance',
    price: 185000,
    salePrice: 175000,
    currency: 'LKR',
    brand: 'Akrapovic',
    sku: 'AKR-TIT-001',
    inStock: true,
    stockQuantity: 12,
    featured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 62,
    categorySlug: 'performance-exhaust',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'Grade 1 Titanium' },
      { key: 'Power Increase', value: '+8.5 HP' },
      { key: 'Weight Reduction', value: '-4.2 kg' },
      { key: 'Sound Level', value: 'Racing (105-110 dB)' },
    ],
    tags: ['exhaust', 'titanium', 'performance', 'racing'],
  },
  {
    name: 'SC Project Full System Exhaust',
    slug: 'sc-project-full-system-exhaust',
    description: 'Complete racing exhaust system with carbon fiber silencer. Used in WorldSBK championship by professional teams.',
    shortDescription: 'WorldSBK racing exhaust with carbon fiber',
    price: 165000,
    currency: 'LKR',
    brand: 'SC Project',
    sku: 'SCP-FULL-001',
    inStock: true,
    stockQuantity: 10,
    isNew: true,
    rating: 4.7,
    reviewCount: 41,
    categorySlug: 'performance-exhaust',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'Stainless Steel + Carbon' },
      { key: 'Power Increase', value: '+7.2 HP' },
      { key: 'Weight Reduction', value: '-3.8 kg' },
      { key: 'Homologation', value: 'Track Only' },
    ],
    tags: ['exhaust', 'carbon', 'racing', 'worldsbk'],
  },
  {
    name: 'Pirelli Diablo Supercorsa SP V4 Tires',
    slug: 'pirelli-diablo-supercorsa-sp-v4',
    description: 'Dual-compound racing tire for track days and aggressive street riding. Excellent grip and consistency in various conditions.',
    shortDescription: 'Track-focused racing tire with dual compound',
    price: 45000,
    currency: 'LKR',
    brand: 'Pirelli',
    sku: 'PIR-DSC-001',
    inStock: true,
    stockQuantity: 30,
    featured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 89,
    categorySlug: 'racing-tires',
    imageUrl: 'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80',
    specifications: [
      { key: 'Compound', value: 'Dual Compound' },
      { key: 'Type', value: 'Track/Aggressive Street' },
      { key: 'Sizes Available', value: '120/70-17, 200/55-17' },
      { key: 'Warm-up Time', value: '2-3 laps' },
    ],
    tags: ['tires', 'pirelli', 'track', 'racing'],
  },
  {
    name: 'Michelin Power Slick 2 Racing Tires',
    slug: 'michelin-power-slick-2',
    description: 'Pure racing slick tire for track use. Maximum grip and heat resistance for competitive racing in dry conditions.',
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
    categorySlug: 'racing-tires',
    imageUrl: 'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
    specifications: [
      { key: 'Compound', value: 'Single Racing Compound' },
      { key: 'Type', value: 'Track Only (Slick)' },
      { key: 'Sizes Available', value: '120/70-17, 190/55-17' },
      { key: 'Operating Temp', value: '80-120°C' },
    ],
    tags: ['tires', 'slick', 'racing', 'michelin'],
  },
  {
    name: 'Ohlins TTX GP Rear Shock',
    slug: 'ohlins-ttx-gp-rear-shock',
    description: 'MotoGP-derived rear shock absorber. Fully adjustable with racing-grade performance and precision damping control.',
    shortDescription: 'MotoGP technology rear shock absorber',
    price: 195000,
    currency: 'LKR',
    brand: 'Ohlins',
    sku: 'OHL-TTX-001',
    inStock: true,
    stockQuantity: 6,
    rating: 4.9,
    reviewCount: 31,
    categorySlug: 'suspension-systems',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    specifications: [
      { key: 'Type', value: 'TTX GP Twin-Tube' },
      { key: 'Adjustments', value: 'Compression/Rebound/Preload' },
      { key: 'Material', value: 'Aluminum/Steel' },
      { key: 'Compatibility', value: 'Most Sport Bikes' },
    ],
    tags: ['suspension', 'ohlins', 'racing', 'motogp'],
  },
  {
    name: 'KYB Racing Front Fork Kit',
    slug: 'kyb-racing-front-fork-kit',
    description: 'Complete front fork upgrade kit with racing internals. Improved damping and adjustability for track performance.',
    shortDescription: 'Racing fork kit with improved damping',
    price: 145000,
    currency: 'LKR',
    brand: 'KYB',
    sku: 'KYB-FORK-001',
    inStock: true,
    stockQuantity: 8,
    isNew: true,
    rating: 4.7,
    reviewCount: 23,
    categorySlug: 'suspension-systems',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    specifications: [
      { key: 'Type', value: 'Racing Cartridge Kit' },
      { key: 'Adjustments', value: 'Compression/Rebound' },
      { key: 'Oil Included', value: 'Yes (Racing Grade)' },
      { key: 'Spring Rate', value: 'Adjustable' },
    ],
    tags: ['suspension', 'fork', 'racing', 'kyb'],
  },
  {
    name: 'Alpinestars GP Pro R3 Racing Gloves',
    slug: 'alpinestars-gp-pro-r3-gloves',
    description: 'Premium racing gloves with touchscreen compatibility and carbon fiber knuckle protection. Perfect for track days.',
    shortDescription: 'Professional racing gloves with carbon protection',
    price: 28000,
    currency: 'LKR',
    brand: 'Alpinestars',
    sku: 'ALP-GLOVE-001',
    inStock: true,
    stockQuantity: 40,
    featured: true,
    rating: 4.8,
    reviewCount: 67,
    categorySlug: 'racing-gloves',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'Leather + Kangaroo Leather Palm' },
      { key: 'Protection', value: 'Carbon Fiber Knuckles' },
      { key: 'Touchscreen', value: 'Compatible' },
      { key: 'Certification', value: 'CE Level 1' },
    ],
    tags: ['gloves', 'racing', 'carbon', 'alpinestars'],
  },
  {
    name: 'Dainese Full Metal 6 Racing Gloves',
    slug: 'dainese-full-metal-6-gloves',
    description: 'Top-tier racing gloves with titanium and carbon fiber protection. Maximum safety for professional track use.',
    shortDescription: 'Premium racing gloves with titanium protection',
    price: 32000,
    currency: 'LKR',
    brand: 'Dainese',
    sku: 'DAI-GLOVE-001',
    inStock: true,
    stockQuantity: 25,
    isNew: true,
    isBestSeller: true,
    rating: 5,
    reviewCount: 52,
    categorySlug: 'racing-gloves',
    imageUrl: 'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'Full-Grain Leather' },
      { key: 'Protection', value: 'Titanium + Carbon Fiber' },
      { key: 'Certification', value: 'CE Level 2 KP' },
      { key: 'Features', value: 'Ergonomic Pre-Curved' },
    ],
    tags: ['gloves', 'racing', 'titanium', 'premium'],
  },
  {
    name: 'TCX RT-Race Pro Air Racing Boots',
    slug: 'tcx-rt-race-pro-air-boots',
    description: 'Professional racing boots with ventilation and maximum ankle protection. Designed for hot weather track riding.',
    shortDescription: 'Ventilated racing boots with ankle protection',
    price: 48000,
    currency: 'LKR',
    brand: 'TCX',
    sku: 'TCX-BOOT-001',
    inStock: true,
    stockQuantity: 18,
    featured: true,
    rating: 4.7,
    reviewCount: 38,
    categorySlug: 'racing-boots',
    imageUrl: 'https://images.unsplash.com/photo-1603808033587-8d49e51a573f?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'Microfiber + Mesh' },
      { key: 'Protection', value: 'Reinforced Ankle' },
      { key: 'Certification', value: 'CE Level 2' },
      { key: 'Closure', value: 'Double Velcro + Zipper' },
    ],
    tags: ['boots', 'racing', 'ventilated', 'protection'],
  },
  {
    name: 'Sidi Mag-1 Racing Boots',
    slug: 'sidi-mag-1-racing-boots',
    description: 'Premium racing boots with magnetic closure system. Used by MotoGP professionals for maximum performance.',
    shortDescription: 'MotoGP racing boots with magnetic closure',
    price: 65000,
    currency: 'LKR',
    brand: 'Sidi',
    sku: 'SIDI-BOOT-001',
    inStock: true,
    stockQuantity: 12,
    isNew: true,
    isBestSeller: true,
    rating: 5,
    reviewCount: 44,
    categorySlug: 'racing-boots',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'Microfiber Technomicro' },
      { key: 'Protection', value: 'TPU Ankle Protection' },
      { key: 'Closure', value: 'Magnetic' },
      { key: 'Certification', value: 'CE Level 2' },
    ],
    tags: ['boots', 'racing', 'magnetic', 'motogp'],
  },
  {
    name: 'Brembo GP4-RX Racing Brake Calipers',
    slug: 'brembo-gp4-rx-calipers',
    description: 'Professional racing brake calipers with radial mounting. Maximum stopping power for competitive track riding.',
    shortDescription: 'Professional radial brake calipers for racing',
    price: 95000,
    currency: 'LKR',
    brand: 'Brembo',
    sku: 'BREM-CAL-001',
    inStock: true,
    stockQuantity: 15,
    featured: true,
    rating: 4.9,
    reviewCount: 56,
    categorySlug: 'performance-brakes',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    specifications: [
      { key: 'Type', value: 'Radial Mount 4-Piston' },
      { key: 'Material', value: 'Billet Aluminum' },
      { key: 'Pad Material', value: 'Racing Compound' },
      { key: 'Mounting', value: '100mm Radial' },
    ],
    tags: ['brakes', 'racing', 'brembo', 'performance'],
  },
  {
    name: 'Nissin Racing Brake Master Cylinder',
    slug: 'nissin-racing-master-cylinder',
    description: 'Premium racing master cylinder with adjustable lever ratio. Precise brake feel and modulation for track use.',
    shortDescription: 'Adjustable racing master cylinder',
    price: 42000,
    currency: 'LKR',
    brand: 'Nissin',
    sku: 'NISS-MC-001',
    inStock: true,
    stockQuantity: 20,
    isNew: true,
    rating: 4.8,
    reviewCount: 34,
    categorySlug: 'performance-brakes',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    specifications: [
      { key: 'Type', value: 'Radial 19x18' },
      { key: 'Material', value: 'Forged Aluminum' },
      { key: 'Adjustment', value: 'Lever Ratio 19-21mm' },
      { key: 'Reservoir', value: 'Integrated' },
    ],
    tags: ['brakes', 'racing', 'nissin', 'adjustable'],
  },
  {
    name: 'HJC RPHA 1 Racing Helmet',
    slug: 'hjc-rpha-1-racing-helmet',
    description: 'Lightweight racing helmet with advanced aerodynamics. Perfect balance of protection and comfort for long track sessions.',
    shortDescription: 'Lightweight racing helmet with aerodynamics',
    price: 72000,
    currency: 'LKR',
    brand: 'HJC',
    sku: 'HJC-RPH1-001',
    inStock: true,
    stockQuantity: 22,
    rating: 4.6,
    reviewCount: 41,
    categorySlug: 'racing-helmets',
    imageUrl: 'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
    specifications: [
      { key: 'Shell Material', value: 'Carbon/Aramid/Fiberglass' },
      { key: 'Weight', value: '1380g' },
      { key: 'Safety Rating', value: 'ECE 22.06, SNELL M2020' },
      { key: 'Visor', value: 'HJ-31 Pinlock Ready' },
    ],
    tags: ['helmet', 'racing', 'lightweight', 'aerodynamic'],
  },
  {
    name: 'Rev\'It One-Piece Spartan Suit',
    slug: 'revit-spartan-racing-suit',
    description: 'One-piece racing suit with advanced stretch panels. Excellent value for track day enthusiasts and club racers.',
    shortDescription: 'Track day racing suit with stretch panels',
    price: 175000,
    currency: 'LKR',
    brand: 'Rev\'It',
    sku: 'REV-SPAR-001',
    inStock: true,
    stockQuantity: 14,
    rating: 4.5,
    reviewCount: 29,
    categorySlug: 'racing-suits',
    imageUrl: 'https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80',
    specifications: [
      { key: 'Material', value: 'PWR|Shell 1.2-1.4mm Leather' },
      { key: 'Protection', value: 'CE Level 1 Armor' },
      { key: 'Stretch Panels', value: 'Multiple Zones' },
      { key: 'Features', value: 'Removable Hump' },
    ],
    tags: ['suit', 'racing', 'trackday', 'revit'],
  },
  {
    name: 'Dunlop SportSmart TT Racing Tires',
    slug: 'dunlop-sportsmart-tt-tires',
    description: 'Track-focused racing tire with excellent warm-up performance. Great for intermediate to advanced track day riders.',
    shortDescription: 'Track day racing tire with quick warm-up',
    price: 38000,
    currency: 'LKR',
    brand: 'Dunlop',
    sku: 'DUN-SSTT-001',
    inStock: true,
    stockQuantity: 35,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 78,
    categorySlug: 'racing-tires',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80',
    specifications: [
      { key: 'Compound', value: 'Multi-Tread (MT)' },
      { key: 'Type', value: 'Track Day / Street Legal' },
      { key: 'Sizes Available', value: '120/70-17, 190/55-17' },
      { key: 'Construction', value: 'Steel Belted' },
    ],
    tags: ['tires', 'racing', 'trackday', 'dunlop'],
  },
  {
    name: 'WP Racing Suspension Front Forks',
    slug: 'wp-racing-suspension-forks',
    description: 'Complete front fork replacement with racing internals. Used in professional championships for ultimate performance.',
    shortDescription: 'Professional racing front fork system',
    price: 225000,
    currency: 'LKR',
    brand: 'WP',
    sku: 'WP-FORK-001',
    inStock: true,
    stockQuantity: 4,
    isNew: true,
    rating: 4.9,
    reviewCount: 18,
    categorySlug: 'suspension-systems',
    imageUrl: 'https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80',
    specifications: [
      { key: 'Type', value: 'USD Fork 43mm' },
      { key: 'Adjustments', value: 'Full Compression/Rebound' },
      { key: 'Coating', value: 'DLC (Diamond-Like Carbon)' },
      { key: 'Spring Type', value: 'Progressive' },
    ],
    tags: ['suspension', 'fork', 'racing', 'professional'],
  },
];

export async function seedRacingMotorcycleDataV2(strapi: Core.Strapi) {
  console.log('\n🏍️  Starting Racing Motorcycle Data Seeder V2...\n');
  console.log('   📊 8 Categories + 20 Products with Image URLs\n');

  try {
    // Step 1: Delete all existing products
    console.log('🗑️  Deleting existing products...');
    const existingProducts = await strapi.entityService.findMany('api::product.product', {
      limit: 1000,
    });

    for (const product of existingProducts) {
      await strapi.entityService.delete('api::product.product', product.id);
    }
    console.log(`   ✓ Deleted ${existingProducts.length} products\n`);

    // Step 2: Delete all existing categories
    console.log('🗑️  Deleting existing categories...');
    const existingCategories = await strapi.entityService.findMany('api::category.category', {
      limit: 1000,
    });

    for (const category of existingCategories) {
      await strapi.entityService.delete('api::category.category', category.id);
    }
    console.log(`   ✓ Deleted ${existingCategories.length} categories\n`);

    // Step 3: Create categories
    console.log('📁 Creating 8 racing motorcycle categories...');
    const categoryMap: Record<string, any> = {};

    for (const category of categories) {
      const created = await strapi.entityService.create('api::category.category', {
        data: {
          ...category,
          publishedAt: new Date(),
        },
      });
      categoryMap[category.slug] = created.id || created.documentId;
      console.log(`   ✓ Created: ${category.name}`);
    }
    console.log(`\n✅ Created ${Object.keys(categoryMap).length}/8 categories\n`);

    // Step 4: Create products
    console.log('📦 Creating 20 racing motorcycle products...');
    let successCount = 0;

    for (const product of products) {
      const { categorySlug, ...productData } = product;
      const categoryId = categoryMap[categorySlug];

      if (!categoryId) {
        console.log(`   ✗ Skipped: ${product.name} (category not found)`);
        continue;
      }

      await strapi.entityService.create('api::product.product', {
        data: {
          ...productData,
          category: categoryId,
          publishedAt: new Date(),
        },
      });

      successCount++;
      console.log(`   ✓ Created: ${product.name}`);
    }

    console.log(`\n✅ Created ${successCount}/20 products\n`);
    console.log('═══════════════════════════════════════════════════════');
    console.log('  🎉 Racing Motorcycle Data Seeding V2 Completed!');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('  📊 Summary:');
    console.log(`     - Categories: ${Object.keys(categoryMap).length}/8`);
    console.log(`     - Products: ${successCount}/20`);
    console.log('\n  🌐 Frontend: http://localhost:3000');
    console.log('  🔧 Admin Panel: http://localhost:1337/admin\n');
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}
