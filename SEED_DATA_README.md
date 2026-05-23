# Racing Motorcycle Data Seeding Guide

This guide will help you populate your Strapi backend with racing motorcycle categories and products.

## Data Included

### Categories (5)
1. **Racing Helmets** - Professional racing helmets
2. **Racing Suits** - High-performance racing suits
3. **Performance Exhaust** - Racing exhaust systems
4. **Racing Tires** - Professional racing tires
5. **Suspension Systems** - Advanced racing suspension

### Products (10)
- AGV Pista GP RR Racing Helmet
- Shoei X-Spirit III Racing Helmet
- Alpinestars GP Tech V3 Racing Suit
- Dainese Misano 2 D-Air Racing Suit
- Akrapovic Racing Titanium Exhaust
- SC Project Full System Exhaust
- Pirelli Diablo Supercorsa SP V4 Tires
- Michelin Power Slick 2 Racing Tires
- Ohlins TTX GP Rear Shock
- KYB Racing Front Fork Kit

## Prerequisites

1. Strapi backend must be running:
   ```bash
   cd veloce-moto-backend
   npm run develop
   ```

2. Make sure you have created the Category and Product content types in Strapi admin

## How to Import Data

### Method 1: Reset and Seed (Recommended - Clears Old Data)

This method will **delete all existing data** and import fresh racing motorcycle data.

1. Make sure your Strapi backend is running on `http://localhost:1337`

2. Run the reset and seed script:
   ```bash
   cd veloce-moto-backend
   node src/reset-and-seed.js
   ```

3. The script will:
   - **Delete** all existing categories and products
   - **Create** 5 new racing motorcycle categories
   - **Create** 10 new racing motorcycle products
   - Link products to their respective categories

### Method 2: Import Only (Keep Existing Data)

If you want to keep existing data and just add new items:

1. Make sure your Strapi backend is running on `http://localhost:1337`

2. Run the import script:
   ```bash
   cd veloce-moto-backend
   node src/import-seed-data.js
   ```

### Method 3: Clear Data Only

If you just want to delete all existing data:

```bash
cd veloce-moto-backend
node src/clear-all-data.js
```

### Method 2: Manual Import via Strapi Admin

1. Go to `http://localhost:1337/admin`

2. Navigate to **Content Manager**

3. **Import Categories:**
   - Click on **Category** in the left sidebar
   - Click **Create new entry**
   - Fill in the data from `src/seed-data.js` categories array
   - Click **Save** and **Publish**
   - Repeat for all 5 categories

4. **Import Products:**
   - Click on **Product** in the left sidebar
   - Click **Create new entry**
   - Fill in the data from `src/seed-data.js` products array
   - Select the appropriate category
   - Click **Save** and **Publish**
   - Repeat for all 10 products

## Important: Set Permissions

After importing data, you must set API permissions:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**

2. Enable the following permissions:

   **Category:**
   - ✅ find
   - ✅ findOne

   **Product:**
   - ✅ find
   - ✅ findOne

3. Click **Save**

## Verify Data Import

1. Open your frontend application:
   ```bash
   cd veloce-moto-frontend
   npm run dev
   ```

2. Visit `http://localhost:3000`

3. You should see:
   - 5 categories in the navbar and category section
   - Featured products displayed on the homepage
   - All products available on `/products` page

## Troubleshooting

### Issue: "Failed to create category/product"
- **Solution**: Check if Strapi is running on `http://localhost:1337`
- **Solution**: Verify content types exist in Strapi admin

### Issue: "Data not showing in frontend"
- **Solution**: Make sure all entries are **Published** (not just saved as drafts)
- **Solution**: Check API permissions are set correctly for Public role

### Issue: "Category not found" when importing products
- **Solution**: Import categories first, then products
- **Solution**: Check category slugs match between categories and products

## Image URLs

All images are using high-quality racing motorcycle images from Unsplash. If you want to change images:

1. Edit `src/seed-data.js`
2. Replace image URLs with your preferred racing motorcycle images
3. Re-run the import script

## Notes

- All prices are in LKR (Sri Lankan Rupees)
- Products marked as `featured: true` will appear on the homepage
- Products with `salePrice` will show discount badges
- `inStock` and `stockQuantity` control availability
- Tags and specifications provide additional product details
