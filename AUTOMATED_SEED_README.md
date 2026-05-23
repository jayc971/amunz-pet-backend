# Automated Racing Motorcycle Data Seeder

## Overview

This seeder automatically populates your Strapi database with racing motorcycle data when the backend starts.

## What Gets Seeded

- **8 Categories**: Racing Helmets, Racing Suits, Performance Exhaust, Racing Tires, Suspension Systems, Racing Gloves, Racing Boots, Performance Brakes
- **20 Products**: Professional racing gear from brands like AGV, Shoei, HJC, Alpinestars, Dainese, Rev'It, Akrapovic, SC Project, Pirelli, Michelin, Dunlop, Ohlins, KYB, WP, TCX, Sidi, Brembo, Nissin, etc.

## How to Use

### Method 1: Automatic Seeding on Startup (Recommended)

1. **Set environment variable** (already done):
   - The `.env` file has `SEED_DATA=true`

2. **Restart your Strapi backend**:
   ```bash
   cd veloce-moto-backend
   npm run develop
   ```

3. **Watch the console output** - You'll see:
   ```
   🏍️  Starting Racing Motorcycle Data Seeder V2...
   🗑️  Deleting existing products...
   🗑️  Deleting existing categories...
   📁 Creating 8 racing motorcycle categories...
   📦 Creating 20 racing motorcycle products...
   🎉 Racing Motorcycle Data Seeding Completed!
   ```

4. **Data is ready!**
   - All categories and products are created AND published
   - No manual publish step needed
   - Public API permissions are automatically set

### Method 2: Disable Auto-Seeding

If you don't want the data to seed every time you restart:

1. Open `.env` file
2. Change `SEED_DATA=true` to `SEED_DATA=false`
3. Restart Strapi

### Method 3: Re-seed Data Later

To re-seed data after disabling auto-seed:

1. Change `.env`: `SEED_DATA=false` → `SEED_DATA=true`
2. Restart Strapi
3. Change back: `SEED_DATA=true` → `SEED_DATA=false`
4. Restart again

## Important Notes

⚠️ **WARNING**: Every time the seeder runs, it will:
- **DELETE** all existing products
- **DELETE** all existing categories
- **CREATE** new racing motorcycle data with image URLs from Unsplash

💡 **Best Practice**:
- Use `SEED_DATA=true` for initial setup
- Once data is loaded, set `SEED_DATA=false` to prevent re-seeding on every restart
- This prevents accidental data loss during development

## How It Works

The seeder is integrated into Strapi's bootstrap lifecycle:

1. **File**: `src/index.ts` - Bootstrap entry point
2. **Seeder**: `src/seed/racing-motorcycle-data-v2.ts` - Contains all data and seeding logic
3. **Trigger**: Runs when `process.env.SEED_DATA === 'true'`
4. **Execution**: Happens automatically during Strapi startup

## Data Structure

### Categories (8)
1. Racing Helmets
2. Racing Suits
3. Performance Exhaust
4. Racing Tires
5. Suspension Systems
6. Racing Gloves
7. Racing Boots
8. Performance Brakes

### Products (20)
- **3 Helmets**: AGV Pista GP RR, Shoei X-Spirit III, HJC RPHA 1
- **3 Suits**: Alpinestars GP Tech V3, Dainese Misano 2, Rev'It One-Piece
- **2 Exhaust**: Akrapovic Titanium, SC Project
- **3 Tires**: Pirelli Supercorsa, Michelin Power Slick, Dunlop Sportmax
- **3 Suspension**: Ohlins TTX GP, KYB Racing Fork, WP Apex Pro
- **2 Gloves**: Alpinestars GP Pro R3, Dainese Full Metal 6
- **2 Boots**: TCX RT-Race, Sidi Mag-1
- **2 Brakes**: Brembo GP4-RX, Nissin 4-Piston

All products include:
- Complete specifications
- Ratings and reviews
- Proper categorization
- Featured/New/BestSeller flags
- Pricing in LKR
- High-quality image URLs from Unsplash

## Verification

After seeding, verify the data:

1. **In Strapi Admin**:
   - Go to `http://localhost:1337/admin`
   - Content Manager → Category (should show 5 published)
   - Content Manager → Product (should show 10 published)

2. **In Frontend**:
   - Go to `http://localhost:3000`
   - Categories should appear in navbar
   - Products should appear on homepage
   - Featured products section should be populated

## Troubleshooting

### Issue: Data not showing in frontend
**Solution**:
- Permissions are set automatically
- If still not showing, go to Settings → Users & Permissions → Public
- Verify `find` and `findOne` are enabled for Category and Product

### Issue: Images not loading
**Solution**:
- Products and categories use the `imageUrl` field with external Unsplash URLs
- No file upload needed - images load directly from URLs
- If images don't load, check your internet connection or try different image URLs

### Issue: Seeder runs every time I restart
**Solution**: Set `SEED_DATA=false` in `.env` after initial seed

### Issue: TypeScript errors
**Solution**:
```bash
cd veloce-moto-backend
npm run build
npm run develop
```

### Issue: Data gets duplicated
**Solution**:
- The seeder DELETES all data first
- Check if `SEED_DATA=true` and it's running multiple times
- Set to `false` after first successful seed

## Customizing Data

To modify the seeded data:

1. Edit `src/seed/racing-motorcycle-data-v2.ts`
2. Modify the `categories` or `products` arrays
3. Update image URLs if needed (use Unsplash or other image hosting services)
4. Save the file
5. Set `SEED_DATA=true` in `.env`
6. Restart Strapi

## Production

⚠️ **IMPORTANT**: Never set `SEED_DATA=true` in production!

This will delete all your production data. Only use for development and initial setup.
