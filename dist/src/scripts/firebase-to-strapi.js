"use strict";
/**
 * Firebase Firestore to Strapi Migration Script
 *
 * For Amunz Pet Store - Migrates all Firebase collections to Strapi
 *
 * Setup:
 * 1. Place your Firebase service account key at: ./serviceAccountKey.json
 * 2. Add STRAPI_API_TOKEN to your .env file (create Full Access token in Strapi Admin)
 * 3. Run: npx ts-node src/scripts/firebase-to-strapi.ts
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const admin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''; // Optional: Add if you have API token
const REQUEST_DELAY_MS = 300; // Delay between requests to prevent overwhelming Strapi
const MAX_RETRIES = 3; // Number of retries for failed requests
// Helper function to add delay between requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Helper function to strip HTML tags from text
function stripHtmlTags(html) {
    if (!html)
        return '';
    return html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
}
// Helper function to decode HTML entities
function decodeHtmlEntities(text) {
    if (!text)
        return '';
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}
// Clean description: remove HTML and decode entities
function cleanDescription(description) {
    if (!description)
        return '';
    const stripped = stripHtmlTags(description);
    const decoded = decodeHtmlEntities(stripped);
    return decoded;
}
// Firebase collection names for Amunz Pet
const FIREBASE_COLLECTIONS = {
    admins: 'admins',
    brands: 'brands',
    categories: 'categories',
    collections: 'collections',
    productGroups: 'product-groups',
    products: 'products',
    settings: 'settings',
    users: 'users',
};
// Initialize Firebase
function initFirebase() {
    const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
    if (!fs.existsSync(serviceAccountPath)) {
        console.error('Error: serviceAccountKey.json not found!');
        console.log('Please place your Firebase service account key at:');
        console.log(serviceAccountPath);
        console.log('\nTo get your service account key:');
        console.log('1. Go to Firebase Console > Project Settings > Service Accounts');
        console.log('2. Click "Generate new private key"');
        console.log('3. Save the file as serviceAccountKey.json in the amunz-pet-backend folder');
        process.exit(1);
    }
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase initialized successfully!');
    return admin.firestore();
}
// Fetch data from Firestore
async function fetchFromFirestore(db, collectionName) {
    console.log(`Fetching ${collectionName} from Firestore...`);
    const snapshot = await db.collection(collectionName).get();
    const data = [];
    snapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    console.log(`Found ${data.length} ${collectionName}`);
    return data;
}
// Create category in Strapi - returns documentId for use in relations
async function createCategoryInStrapi(category, existingCategories) {
    var _a;
    // Check if category already exists by slug or name
    const name = category.name || category.title || 'Unnamed Category';
    const slug = category.slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (existingCategories.has(slug)) {
        console.log(`Category "${name}" already exists, skipping...`);
        const existingDocId = existingCategories.get(slug);
        return { strapiId: 0, documentId: existingDocId };
    }
    // Handle image - Firebase uses imageURL
    let imageUrl = '';
    if (typeof category.imageURL === 'string') {
        imageUrl = category.imageURL;
    }
    else if (typeof category.image === 'string') {
        imageUrl = category.image;
    }
    else if (typeof category.imageUrl === 'string') {
        imageUrl = category.imageUrl;
    }
    else if ((_a = category.image) === null || _a === void 0 ? void 0 : _a.url) {
        imageUrl = category.image.url;
    }
    const strapiCategory = {
        data: {
            name: name,
            slug: slug,
            description: category.description || '',
            imageUrl: imageUrl,
            order: parseInt(category.order) || parseInt(category.sortOrder) || 0,
        },
    };
    try {
        const response = await fetch(`${STRAPI_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
            body: JSON.stringify(strapiCategory),
        });
        if (!response.ok) {
            const error = await response.text();
            console.error(`Failed to create category "${name}" (${response.status}):`, error.substring(0, 300));
            return null;
        }
        const result = await response.json();
        const strapiId = result.data.id;
        const documentId = result.data.documentId || String(strapiId);
        // Strapi v5: Publish the category after creation
        try {
            const publishResponse = await fetch(`${STRAPI_URL}/api/categories/${documentId}/actions/publish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
                },
            });
            if (!publishResponse.ok) {
                console.log(`  Warning: Could not publish category "${name}" (${publishResponse.status})`);
            }
        }
        catch (publishError) {
            console.log(`  Warning: Error publishing category "${name}"`);
        }
        console.log(`Created category: ${name} (ID: ${strapiId}, docId: ${documentId}, Firebase ID: ${category.id})`);
        return { strapiId, documentId };
    }
    catch (error) {
        console.error(`Error creating category "${name}":`, error);
        return null;
    }
}
// Create brand in Strapi - returns documentId for use in relations
async function createBrandInStrapi(brand, existingBrands) {
    var _a;
    const name = brand.name || brand.title || 'Unnamed Brand';
    const slug = brand.slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (existingBrands.has(slug)) {
        console.log(`Brand "${name}" already exists, skipping...`);
        return { strapiId: 0, documentId: existingBrands.get(slug) };
    }
    // Handle logo - Firebase uses imageURL
    let logoUrl = '';
    if (typeof brand.imageURL === 'string') {
        logoUrl = brand.imageURL;
    }
    else if (typeof brand.logo === 'string') {
        logoUrl = brand.logo;
    }
    else if (typeof brand.logoUrl === 'string') {
        logoUrl = brand.logoUrl;
    }
    else if (typeof brand.image === 'string') {
        logoUrl = brand.image;
    }
    else if ((_a = brand.logo) === null || _a === void 0 ? void 0 : _a.url) {
        logoUrl = brand.logo.url;
    }
    const strapiBrand = {
        data: {
            name: name,
            slug: slug,
            description: brand.description || '',
            logoUrl: logoUrl,
            order: parseInt(brand.order) || parseInt(brand.sortOrder) || 0,
        },
    };
    try {
        const response = await fetch(`${STRAPI_URL}/api/brands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
            body: JSON.stringify(strapiBrand),
        });
        if (!response.ok) {
            const error = await response.text();
            console.error(`Failed to create brand "${name}" (${response.status}):`, error.substring(0, 300));
            return null;
        }
        const result = await response.json();
        const brandId = result.data.id;
        const documentId = result.data.documentId || String(brandId);
        // Strapi v5: Publish the brand after creation
        try {
            const publishResponse = await fetch(`${STRAPI_URL}/api/brands/${documentId}/actions/publish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
                },
            });
            if (!publishResponse.ok) {
                console.log(`  Warning: Could not publish brand "${name}" (${publishResponse.status})`);
            }
        }
        catch (publishError) {
            console.log(`  Warning: Error publishing brand "${name}"`);
        }
        console.log(`Created brand: ${name} (ID: ${brandId}, docId: ${documentId}, Firebase ID: ${brand.id})`);
        return { strapiId: brandId, documentId };
    }
    catch (error) {
        console.error(`Error creating brand "${name}":`, error);
        return null;
    }
}
// Fetch existing products from Strapi (for skipping duplicates)
async function fetchExistingProducts() {
    const slugs = new Set();
    try {
        let page = 1;
        let hasMore = true;
        while (hasMore) {
            const response = await fetch(`${STRAPI_URL}/api/products?pagination[page]=${page}&pagination[pageSize]=100&fields[0]=slug`, {
                headers: {
                    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
                },
            });
            if (response.ok) {
                const result = await response.json();
                result.data.forEach((product) => {
                    if (product.slug)
                        slugs.add(product.slug);
                });
                hasMore = result.data.length === 100;
                page++;
            }
            else {
                hasMore = false;
            }
            await sleep(50);
        }
    }
    catch (error) {
        console.log('Error fetching existing products:', error);
    }
    console.log(`Found ${slugs.size} existing products in Strapi`);
    return slugs;
}
// Retry wrapper for fetch requests
async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
    var _a, _b, _c, _d;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            return response;
        }
        catch (error) {
            const isConnectionError = ((_a = error.cause) === null || _a === void 0 ? void 0 : _a.code) === 'ECONNREFUSED' ||
                ((_b = error.cause) === null || _b === void 0 ? void 0 : _b.code) === 'ECONNRESET' ||
                error.code === 'ECONNREFUSED' ||
                error.code === 'ECONNRESET' ||
                ((_c = error.message) === null || _c === void 0 ? void 0 : _c.includes('ECONNREFUSED')) ||
                ((_d = error.message) === null || _d === void 0 ? void 0 : _d.includes('fetch failed'));
            if (isConnectionError && i < retries - 1) {
                const waitTime = 2000 * (i + 1); // Exponential backoff: 2s, 4s, 6s
                console.log(`Connection error, waiting ${waitTime / 1000}s and retrying (${i + 1}/${retries})...`);
                await sleep(waitTime);
                continue;
            }
            throw error;
        }
    }
    throw new Error('Max retries exceeded');
}
// Create product in Strapi - uses documentId for relations (Strapi v5)
async function createProductInStrapi(product, categoryMap, brandMap, existingProducts) {
    // Get product name - Firebase uses 'title'
    const productName = product.title || product.name || 'Unnamed Product';
    // Generate slug from name
    const slug = product.slug || productName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .substring(0, 50);
    // Skip if product already exists
    if (existingProducts.has(slug)) {
        console.log(`Product "${productName}" already exists (slug: ${slug}), skipping...`);
        return -1; // Return -1 to indicate skipped (not failed)
    }
    // Find category documentId using categoryId from Firebase
    let categoryDocId = null;
    const catRef = product.categoryId || product.category;
    if (catRef) {
        // Direct lookup using Firebase document ID
        categoryDocId = categoryMap.get(catRef) || null;
        if (!categoryDocId) {
            console.log(`  Warning: Category not found for "${productName}"`);
            console.log(`    Looking for categoryId: "${catRef}"`);
            console.log(`    Available keys: ${Array.from(categoryMap.keys()).slice(0, 5).join(', ')}...`);
        }
    }
    // Find brand documentId using brandId from Firebase
    let brandDocId = null;
    const brandRef = product.brandId || product.brand;
    if (brandRef) {
        // Direct lookup using Firebase document ID
        brandDocId = brandMap.get(brandRef) || null;
        // Try lowercase lookup
        if (!brandDocId && typeof brandRef === 'string') {
            brandDocId = brandMap.get(brandRef.toLowerCase()) || null;
        }
        if (!brandDocId) {
            console.log(`  Warning: Brand not found for "${productName}" (brandId: ${brandRef})`);
        }
    }
    // Clean description - remove HTML tags and decode entities
    const rawDescription = product.description || '';
    const rawShortDescription = product.shortDescription || '';
    const cleanedDescription = cleanDescription(rawDescription);
    const cleanedShortDescription = cleanDescription(rawShortDescription);
    // Debug: Show cleaning for first few products with HTML
    if (rawDescription.includes('<') && rawDescription !== cleanedDescription) {
        console.log(`  Cleaned description for "${productName}":`);
        console.log(`    Before: ${rawDescription.substring(0, 80)}...`);
        console.log(`    After:  ${cleanedDescription.substring(0, 80)}...`);
    }
    // Handle images - Firebase uses featureImageURL for main image, imageList for additional images
    let imageUrl = product.featureImageURL || product.imageUrl || product.image || '';
    // Collect all image URLs (imageList from Firebase)
    let imageUrls = [];
    if (Array.isArray(product.imageList) && product.imageList.length > 0) {
        imageUrls = product.imageList.filter((url) => typeof url === 'string' && url.length > 0);
        // If no main image, use first from list
        if (!imageUrl && imageUrls.length > 0) {
            imageUrl = imageUrls[0];
        }
    }
    // Parse isFeatured - Firebase stores as string "true"/"false"
    const isFeatured = product.isFeatured === true || product.isFeatured === 'true';
    const isNew = product.isNew === true || product.isNew === 'true';
    const isBestSeller = product.isBestSeller === true || product.isBestSeller === 'true' || product.popular === true;
    // Build the product data
    const productData = {
        name: productName,
        slug: slug,
        description: cleanedDescription,
        shortDescription: cleanedShortDescription,
        price: parseFloat(product.price) || 0,
        salePrice: product.salePrice ? parseFloat(product.salePrice) : null,
        currency: product.currency || 'LKR',
        imageUrl: imageUrl,
        imageUrls: imageUrls,
        sku: product.sku || `SKU-${product.id || Date.now()}`,
        inStock: parseInt(product.stock) > 0,
        stockQuantity: parseInt(product.stock) || 0,
        tags: Array.isArray(product.tags) ? product.tags : [],
        specifications: Array.isArray(product.specifications) ? product.specifications : [],
        rating: parseFloat(product.rating) || 0,
        reviewCount: parseInt(product.reviewCount) || 0,
        featured: isFeatured,
        isNew: isNew,
        isBestSeller: isBestSeller,
    };
    // Strapi v5: Relations require documentId with connect syntax
    if (categoryDocId) {
        productData.category = { connect: [{ documentId: categoryDocId }] };
        console.log(`  Setting category documentId: ${categoryDocId} for "${productName}"`);
    }
    if (brandDocId) {
        productData.brand = { connect: [{ documentId: brandDocId }] };
        console.log(`  Setting brand documentId: ${brandDocId} for "${productName}"`);
    }
    const strapiProduct = { data: productData };
    try {
        const response = await fetchWithRetry(`${STRAPI_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
            body: JSON.stringify(strapiProduct),
        });
        if (!response.ok) {
            const error = await response.text();
            console.error(`Failed to create product "${productName}" (${response.status}):`);
            console.error(`  Error: ${error.substring(0, 500)}`);
            // Log the request data for debugging
            console.error(`  Request had category: ${productData.category}, brand: ${productData.brand}`);
            return null;
        }
        const result = await response.json();
        const productId = result.data.id;
        const documentId = result.data.documentId || String(productId);
        // Note: Strapi v5 with draftAndPublish: false means products are immediately published
        // The 405 error from publish endpoint can be ignored if draftAndPublish is disabled in schema
        console.log(`Created product: ${productName} (ID: ${productId}, docId: ${documentId}, cat: ${categoryDocId || 'none'})`);
        // Add to existing products to prevent duplicate attempts within same run
        existingProducts.add(slug);
        return productId;
    }
    catch (error) {
        console.error(`Error creating product "${productName}":`, error);
        return null;
    }
}
// Fetch existing categories from Strapi - returns documentId for relations
async function fetchExistingCategories() {
    const map = new Map();
    try {
        const response = await fetch(`${STRAPI_URL}/api/categories?pagination[pageSize]=100`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        if (response.ok) {
            const result = await response.json();
            result.data.forEach((cat) => {
                const docId = cat.documentId || String(cat.id);
                map.set(cat.slug, docId);
            });
        }
    }
    catch (error) {
        console.log('No existing categories found or Strapi not running');
    }
    return map;
}
// Fetch existing brands from Strapi - returns documentId for relations
async function fetchExistingBrands() {
    const map = new Map();
    try {
        const response = await fetch(`${STRAPI_URL}/api/brands?pagination[pageSize]=100`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        if (response.ok) {
            const result = await response.json();
            result.data.forEach((brand) => {
                const docId = brand.documentId || String(brand.id);
                map.set(brand.slug, docId);
            });
        }
    }
    catch (error) {
        console.log('No existing brands found or Strapi not running');
    }
    return map;
}
// Clear existing data from Strapi
async function clearStrapiData() {
    console.log('\nClearing existing Strapi data...');
    if (!STRAPI_API_TOKEN) {
        console.log('WARNING: No STRAPI_API_TOKEN set. DELETE operations may fail due to permissions.');
        console.log('Create a Full Access API token in Strapi Admin > Settings > API Tokens');
    }
    // Delete all products first (due to foreign key constraints)
    // Strapi v5: need to fetch both published and draft content
    try {
        // Fetch all products (published)
        const productsResponse = await fetch(`${STRAPI_URL}/api/products?pagination[pageSize]=1000`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        // Also try to fetch draft products (Strapi v5)
        const draftResponse = await fetch(`${STRAPI_URL}/api/products?pagination[pageSize]=1000&status=draft`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        const allProducts = [];
        const seenIds = new Set();
        if (productsResponse.ok) {
            const published = await productsResponse.json();
            published.data.forEach(p => {
                const docId = p.documentId || String(p.id);
                if (!seenIds.has(docId)) {
                    seenIds.add(docId);
                    allProducts.push(p);
                }
            });
        }
        if (draftResponse.ok) {
            const drafts = await draftResponse.json();
            drafts.data.forEach(p => {
                const docId = p.documentId || String(p.id);
                if (!seenIds.has(docId)) {
                    seenIds.add(docId);
                    allProducts.push(p);
                }
            });
        }
        console.log(`Found ${allProducts.length} products to delete`);
        let deletedCount = 0;
        let failedCount = 0;
        for (const product of allProducts) {
            // Strapi v5 uses documentId for API operations
            const identifier = product.documentId || product.id;
            const deleteResponse = await fetch(`${STRAPI_URL}/api/products/${identifier}`, {
                method: 'DELETE',
                headers: {
                    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
                },
            });
            if (deleteResponse.ok) {
                deletedCount++;
            }
            else {
                failedCount++;
                if (failedCount === 1) {
                    const errorText = await deleteResponse.text();
                    console.log(`  First delete error (${deleteResponse.status}): ${errorText.substring(0, 200)}`);
                }
            }
            await sleep(50);
        }
        console.log(`Products: ${deletedCount} deleted, ${failedCount} failed`);
    }
    catch (error) {
        console.log('Error clearing products:', error);
    }
    // Delete all categories
    try {
        const categoriesResponse = await fetch(`${STRAPI_URL}/api/categories?pagination[pageSize]=1000`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        const draftCategoriesResponse = await fetch(`${STRAPI_URL}/api/categories?pagination[pageSize]=1000&status=draft`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        const allCategories = [];
        const seenIds = new Set();
        if (categoriesResponse.ok) {
            const published = await categoriesResponse.json();
            published.data.forEach(c => {
                const docId = c.documentId || String(c.id);
                if (!seenIds.has(docId)) {
                    seenIds.add(docId);
                    allCategories.push(c);
                }
            });
        }
        if (draftCategoriesResponse.ok) {
            const drafts = await draftCategoriesResponse.json();
            drafts.data.forEach(c => {
                const docId = c.documentId || String(c.id);
                if (!seenIds.has(docId)) {
                    seenIds.add(docId);
                    allCategories.push(c);
                }
            });
        }
        console.log(`Found ${allCategories.length} categories to delete`);
        let deletedCount = 0;
        let failedCount = 0;
        for (const category of allCategories) {
            const identifier = category.documentId || category.id;
            const deleteResponse = await fetch(`${STRAPI_URL}/api/categories/${identifier}`, {
                method: 'DELETE',
                headers: {
                    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
                },
            });
            if (deleteResponse.ok) {
                deletedCount++;
            }
            else {
                failedCount++;
                if (failedCount === 1) {
                    const errorText = await deleteResponse.text();
                    console.log(`  First delete error (${deleteResponse.status}): ${errorText.substring(0, 200)}`);
                }
            }
            await sleep(50);
        }
        console.log(`Categories: ${deletedCount} deleted, ${failedCount} failed`);
    }
    catch (error) {
        console.log('Error clearing categories:', error);
    }
    // Delete all brands
    try {
        const brandsResponse = await fetch(`${STRAPI_URL}/api/brands?pagination[pageSize]=1000`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        const draftBrandsResponse = await fetch(`${STRAPI_URL}/api/brands?pagination[pageSize]=1000&status=draft`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        const allBrands = [];
        const seenIds = new Set();
        if (brandsResponse.ok) {
            const published = await brandsResponse.json();
            published.data.forEach(b => {
                const docId = b.documentId || String(b.id);
                if (!seenIds.has(docId)) {
                    seenIds.add(docId);
                    allBrands.push(b);
                }
            });
        }
        if (draftBrandsResponse.ok) {
            const drafts = await draftBrandsResponse.json();
            drafts.data.forEach(b => {
                const docId = b.documentId || String(b.id);
                if (!seenIds.has(docId)) {
                    seenIds.add(docId);
                    allBrands.push(b);
                }
            });
        }
        console.log(`Found ${allBrands.length} brands to delete`);
        let deletedCount = 0;
        let failedCount = 0;
        for (const brand of allBrands) {
            const identifier = brand.documentId || brand.id;
            const deleteResponse = await fetch(`${STRAPI_URL}/api/brands/${identifier}`, {
                method: 'DELETE',
                headers: {
                    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
                },
            });
            if (deleteResponse.ok) {
                deletedCount++;
            }
            else {
                failedCount++;
                if (failedCount === 1) {
                    const errorText = await deleteResponse.text();
                    console.log(`  First delete error (${deleteResponse.status}): ${errorText.substring(0, 200)}`);
                }
            }
            await sleep(50);
        }
        console.log(`Brands: ${deletedCount} deleted, ${failedCount} failed`);
    }
    catch (error) {
        console.log('Error clearing brands:', error);
    }
    console.log('Data clearing complete.\n');
}
// Export data to JSON file (for backup)
async function exportToJson(data) {
    const exportPath = path.join(__dirname, '../../firebase-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(data, null, 2));
    console.log(`\nData exported to: ${exportPath}`);
}
// Build collection/product-group lookup for tags
function buildCollectionTags(collections, productGroups) {
    const map = new Map();
    // Process collections - products might reference these
    collections.forEach((col) => {
        if (col.products && Array.isArray(col.products)) {
            col.products.forEach((productId) => {
                const existing = map.get(productId) || [];
                existing.push(col.name || col.id);
                map.set(productId, existing);
            });
        }
    });
    // Process product groups
    productGroups.forEach((group) => {
        if (group.products && Array.isArray(group.products)) {
            group.products.forEach((productId) => {
                const existing = map.get(productId) || [];
                existing.push(group.name || group.id);
                map.set(productId, existing);
            });
        }
    });
    return map;
}
// Test Strapi connectivity and permissions
async function testStrapiConnection() {
    console.log('\n--- Testing Strapi Connection ---');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`API Token: ${STRAPI_API_TOKEN ? 'Configured (' + STRAPI_API_TOKEN.substring(0, 10) + '...)' : 'NOT SET'}`);
    if (!STRAPI_API_TOKEN) {
        console.log('\nWARNING: No STRAPI_API_TOKEN configured!');
        console.log('You need a Full Access API token for this migration to work.');
        console.log('Create one in Strapi Admin > Settings > API Tokens');
        console.log('Then add to .env: STRAPI_API_TOKEN=your_token_here\n');
    }
    try {
        // Test read access
        const readResponse = await fetch(`${STRAPI_URL}/api/categories`, {
            headers: {
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
        });
        console.log(`Read test (GET /api/categories): ${readResponse.status} ${readResponse.ok ? 'OK' : 'FAILED'}`);
        // Test write access by trying to create and delete a test category
        const testCategory = {
            data: {
                name: '__test_migration_category__',
                slug: '__test-migration-category__',
            },
        };
        const writeResponse = await fetch(`${STRAPI_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
            },
            body: JSON.stringify(testCategory),
        });
        console.log(`Write test (POST /api/categories): ${writeResponse.status} ${writeResponse.ok ? 'OK' : 'FAILED'}`);
        if (writeResponse.ok) {
            const created = await writeResponse.json();
            const identifier = created.data.documentId || created.data.id;
            // Clean up test entry
            const deleteResponse = await fetch(`${STRAPI_URL}/api/categories/${identifier}`, {
                method: 'DELETE',
                headers: {
                    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
                },
            });
            console.log(`Delete test (DELETE /api/categories): ${deleteResponse.status} ${deleteResponse.ok ? 'OK' : 'FAILED'}`);
            if (!deleteResponse.ok) {
                console.log('\nERROR: Cannot delete categories. Migration will fail.');
                console.log('Please ensure your API token has Full Access permissions.');
                return false;
            }
        }
        else {
            const errorText = await writeResponse.text();
            console.log(`Write error: ${errorText.substring(0, 200)}`);
            console.log('\nERROR: Cannot create categories. Migration will fail.');
            console.log('Please ensure your API token has Full Access permissions.');
            return false;
        }
        console.log('Strapi connection test: PASSED\n');
        return true;
    }
    catch (error) {
        console.error('Connection test failed:', error);
        console.log('\nERROR: Cannot connect to Strapi.');
        console.log(`Make sure Strapi is running at ${STRAPI_URL}`);
        return false;
    }
}
// Main migration function
async function migrate() {
    var _a;
    console.log('='.repeat(60));
    console.log('Amunz Pet - Firebase to Strapi Migration');
    console.log('='.repeat(60));
    // Test Strapi connection first
    const connected = await testStrapiConnection();
    if (!connected) {
        console.log('\nMigration aborted due to connection/permission issues.');
        process.exit(1);
    }
    // Initialize Firebase
    const db = initFirebase();
    // Fetch ALL data from Firestore
    console.log('\n--- Fetching data from Firebase ---');
    const admins = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.admins);
    const brands = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.brands);
    const categories = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.categories);
    const collections = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.collections);
    const productGroups = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.productGroups);
    const products = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.products);
    const settings = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.settings);
    const users = await fetchFromFirestore(db, FIREBASE_COLLECTIONS.users);
    // Export ALL data to JSON for backup
    await exportToJson({
        admins,
        brands,
        categories,
        collections,
        productGroups,
        products,
        settings,
        users,
    });
    console.log('\n--- Summary of Firebase Data ---');
    console.log(`Admins: ${admins.length}`);
    console.log(`Brands: ${brands.length}`);
    console.log(`Categories: ${categories.length}`);
    console.log(`Collections: ${collections.length}`);
    console.log(`Product Groups: ${productGroups.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Settings: ${settings.length}`);
    console.log(`Users: ${users.length}`);
    // Build lookup maps for collection tags
    const collectionTags = buildCollectionTags(collections, productGroups);
    // Clear existing Strapi data
    await clearStrapiData();
    // Create categories in Strapi
    console.log('\n--- Importing categories to Strapi ---');
    const categoryMap = new Map(); // Maps Firebase ID/slug to Strapi documentId
    const existingCategories = await fetchExistingCategories();
    console.log(`Found ${existingCategories.size} existing categories in Strapi`);
    for (const category of categories) {
        const slug = category.slug || ((_a = category.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
        const result = await createCategoryInStrapi(category, existingCategories);
        if (result) {
            // Map by slug using documentId (for Strapi v5 relations)
            if (slug)
                categoryMap.set(slug, result.documentId);
            // Map by Firebase document ID - this is the key lookup for products
            if (category.id) {
                categoryMap.set(category.id, result.documentId);
                console.log(`  -> Mapped Firebase ID "${category.id}" to Strapi docId ${result.documentId}`);
            }
        }
        else {
            console.log(`  -> FAILED to create category: ${category.name || category.id}`);
        }
        await sleep(REQUEST_DELAY_MS);
    }
    console.log(`\nCategory mapping complete. Map has ${categoryMap.size} entries:`);
    categoryMap.forEach((docId, key) => {
        console.log(`  "${key}" -> ${docId}`);
    });
    // Create brands in Strapi
    console.log('\n--- Importing brands to Strapi ---');
    const brandMap = new Map(); // Maps Firebase ID/slug/name to Strapi documentId
    const existingBrands = await fetchExistingBrands();
    console.log(`Found ${existingBrands.size} existing brands in Strapi`);
    for (const brand of brands) {
        const name = brand.name || brand.title || '';
        const slug = brand.slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const result = await createBrandInStrapi(brand, existingBrands);
        if (result) {
            // Map by slug using documentId (for Strapi v5 relations)
            if (slug)
                brandMap.set(slug, result.documentId);
            // Map by name (lowercase for flexible lookup)
            if (name)
                brandMap.set(name.toLowerCase(), result.documentId);
            // Also map by Firebase document ID for reference lookups
            if (brand.id) {
                brandMap.set(brand.id, result.documentId);
                console.log(`  -> Mapped Firebase ID "${brand.id}" to Strapi docId ${result.documentId}`);
            }
        }
        else {
            console.log(`  -> FAILED to create brand: ${brand.name || brand.id}`);
        }
        await sleep(REQUEST_DELAY_MS);
    }
    console.log(`Brand map has ${brandMap.size} entries`);
    // Create products in Strapi
    console.log('\n--- Importing products to Strapi ---');
    // Don't check for existing products since we just cleared everything
    // This ensures products are recreated with clean descriptions
    const existingProducts = new Set();
    console.log('(Skipping existing product check - fresh import after clear)');
    let successCount = 0;
    let skippedCount = 0;
    let failCount = 0;
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        // Add collection/group tags
        const extraTags = collectionTags.get(product.id) || [];
        product.tags = [...(product.tags || []), ...extraTags];
        const id = await createProductInStrapi(product, categoryMap, brandMap, existingProducts);
        if (id === -1) {
            skippedCount++;
        }
        else if (id) {
            successCount++;
        }
        else {
            failCount++;
        }
        // Progress indicator every 10 products
        if ((i + 1) % 10 === 0) {
            console.log(`Progress: ${i + 1}/${products.length} products processed...`);
        }
        // Add delay between requests to prevent overwhelming Strapi
        await sleep(REQUEST_DELAY_MS);
    }
    console.log('\n' + '='.repeat(60));
    console.log('Migration Complete!');
    console.log('='.repeat(60));
    console.log(`Categories: ${categories.length} imported`);
    console.log(`Brands: ${brands.length} imported`);
    console.log(`Products: ${successCount} imported, ${skippedCount} skipped (already exist), ${failCount} failed`);
    console.log(`Collections/Groups: Mapped as product tags`);
    console.log('\nFull backup saved to: firebase-export.json');
    console.log('\nNote: admins, users, settings not imported (Strapi has its own auth)');
    process.exit(0);
}
// Run migration
migrate().catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
});
