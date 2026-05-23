# Manual Setup Guide - Racing Motorcycle Data

Since the API scripts require authentication, follow these steps to manually replace the data in Strapi admin.

## Step 1: Delete Old Data

1. Go to **http://localhost:1337/admin**
2. Login to your admin panel
3. Click **Content Manager** in the left sidebar

### Delete Old Products:
1. Click **Product**
2. Select all products (checkbox at the top)
3. Click the **Delete** button
4. Confirm deletion

### Delete Old Categories:
1. Click **Category**
2. Select all categories (checkbox at the top)
3. Click the **Delete** button
4. Confirm deletion

---

## Step 2: Add New Categories (5 total)

Click **Category** → **Create new entry** and add each category:

### Category 1: Racing Helmets
- **Name**: `Racing Helmets`
- **Slug**: `racing-helmets` (auto-generated)
- **Description**: `Professional racing helmets for maximum safety and aerodynamics`
- **Order**: `1`
- **Image**: Upload or use URL: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80`
- Click **Save** → **Publish**

### Category 2: Racing Suits
- **Name**: `Racing Suits`
- **Slug**: `racing-suits`
- **Description**: `High-performance racing suits with advanced protection`
- **Order**: `2`
- **Image**: `https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80`
- Click **Save** → **Publish**

### Category 3: Performance Exhaust
- **Name**: `Performance Exhaust`
- **Slug**: `performance-exhaust`
- **Description**: `Racing exhaust systems for maximum power output`
- **Order**: `3`
- **Image**: `https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80`
- Click **Save** → **Publish**

### Category 4: Racing Tires
- **Name**: `Racing Tires`
- **Slug**: `racing-tires`
- **Description**: `Professional racing slicks and track day tires`
- **Order**: `4`
- **Image**: `https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80`
- Click **Save** → **Publish**

### Category 5: Suspension Systems
- **Name**: `Suspension Systems`
- **Slug**: `suspension-systems`
- **Description**: `Advanced racing suspension components and upgrades`
- **Order**: `5`
- **Image**: `https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80`
- Click **Save** → **Publish**

---

## Step 3: Add New Products (10 total)

Click **Product** → **Create new entry** and add each product:

### Product 1: AGV Pista GP RR Racing Helmet
- **Name**: `AGV Pista GP RR Racing Helmet`
- **Slug**: `agv-pista-gp-rr-helmet`
- **Description**: `Top-tier racing helmet used by MotoGP professionals. Features carbon fiber shell and advanced aerodynamics.`
- **Short Description**: `Professional MotoGP racing helmet with carbon fiber construction`
- **Price**: `125000`
- **Sale Price**: `115000`
- **Currency**: `LKR`
- **Brand**: `AGV`
- **SKU**: `AGV-PISTA-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `15`
- **Featured**: ✅ Yes
- **Is New**: ✅ Yes
- **Is Best Seller**: ✅ Yes
- **Rating**: `5`
- **Review Count**: `47`
- **Category**: Select **Racing Helmets**
- **Images**: Add image URLs or upload
  - `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80`
  - `https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80`
- **Specifications**: Add in JSON format:
```json
[
  {"key": "Shell Material", "value": "Carbon Fiber"},
  {"key": "Weight", "value": "1350g"},
  {"key": "Safety Rating", "value": "ECE 22.06, DOT"},
  {"key": "Visor", "value": "Anti-scratch, Anti-fog"}
]
```
- **Tags**: `racing, motogp, carbon-fiber, premium`
- Click **Save** → **Publish**

### Product 2: Shoei X-Spirit III Racing Helmet
- **Name**: `Shoei X-Spirit III Racing Helmet`
- **Slug**: `shoei-x-spirit-iii-helmet`
- **Description**: `Premium racing helmet with exceptional ventilation and aerodynamic stability at high speeds.`
- **Short Description**: `Professional racing helmet with superior aerodynamics`
- **Price**: `98000`
- **Currency**: `LKR`
- **Brand**: `Shoei`
- **SKU**: `SHOEI-XS3-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `20`
- **Featured**: ✅ Yes
- **Is Best Seller**: ✅ Yes
- **Rating**: `4.8`
- **Review Count**: `35`
- **Category**: Select **Racing Helmets**
- **Images**:
  - `https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80`
  - `https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Shell Material", "value": "AIM+ Composite"},
  {"key": "Weight", "value": "1400g"},
  {"key": "Safety Rating", "value": "ECE 22.05, SNELL"},
  {"key": "Ventilation", "value": "8 intake, 6 exhaust"}
]
```
- **Tags**: `racing, track, premium, aerodynamic`
- Click **Save** → **Publish**

### Product 3: Alpinestars GP Tech V3 Racing Suit
- **Name**: `Alpinestars GP Tech V3 Racing Suit`
- **Slug**: `alpinestars-gp-tech-v3-suit`
- **Description**: `One-piece leather racing suit with Tech-Air compatible. Race-proven protection and flexibility.`
- **Short Description**: `Professional one-piece racing suit with airbag compatibility`
- **Price**: `285000`
- **Sale Price**: `265000`
- **Currency**: `LKR`
- **Brand**: `Alpinestars`
- **SKU**: `ALP-GPT3-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `8`
- **Featured**: ✅ Yes
- **Is New**: ✅ Yes
- **Rating**: `4.9`
- **Review Count**: `28`
- **Category**: Select **Racing Suits**
- **Images**:
  - `https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80`
  - `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Material", "value": "1.3mm Premium Leather"},
  {"key": "Protection", "value": "CE Level 2 Armor"},
  {"key": "Tech-Air", "value": "Compatible"},
  {"key": "Stretch Panels", "value": "Dynamic Friction Shield"}
]
```
- **Tags**: `racing, leather, airbag, protection`
- Click **Save** → **Publish**

### Product 4: Dainese Misano 2 D-Air Racing Suit
- **Name**: `Dainese Misano 2 D-Air Racing Suit`
- **Slug**: `dainese-misano-2-dair-suit`
- **Description**: `Professional racing suit with integrated D-Air airbag system. Maximum protection for track use.`
- **Short Description**: `Race suit with integrated airbag protection system`
- **Price**: `320000`
- **Currency**: `LKR`
- **Brand**: `Dainese`
- **SKU**: `DAI-MIS2-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `5`
- **Featured**: ✅ Yes
- **Rating**: `5`
- **Review Count**: `19`
- **Category**: Select **Racing Suits**
- **Images**:
  - `https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80`
  - `https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Material", "value": "Premium Leather + Microfiber"},
  {"key": "Protection", "value": "D-Air Airbag Integrated"},
  {"key": "Armor", "value": "CE Level 2"},
  {"key": "Weight", "value": "5.2kg (with D-Air)"}
]
```
- **Tags**: `racing, airbag, premium, dainese`
- Click **Save** → **Publish**

### Product 5: Akrapovic Racing Titanium Exhaust
- **Name**: `Akrapovic Racing Titanium Exhaust`
- **Slug**: `akrapovic-racing-titanium-exhaust`
- **Description**: `Full racing exhaust system made from titanium. Significant weight reduction and power increase.`
- **Short Description**: `Titanium racing exhaust for maximum performance`
- **Price**: `185000`
- **Sale Price**: `175000`
- **Currency**: `LKR`
- **Brand**: `Akrapovic`
- **SKU**: `AKR-TIT-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `12`
- **Featured**: ✅ Yes
- **Is Best Seller**: ✅ Yes
- **Rating**: `4.9`
- **Review Count**: `62`
- **Category**: Select **Performance Exhaust**
- **Images**:
  - `https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80`
  - `https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Material", "value": "Grade 1 Titanium"},
  {"key": "Power Increase", "value": "+8.5 HP"},
  {"key": "Weight Reduction", "value": "-4.2 kg"},
  {"key": "Sound Level", "value": "Racing (105-110 dB)"}
]
```
- **Tags**: `exhaust, titanium, performance, racing`
- Click **Save** → **Publish**

### Product 6: SC Project Full System Exhaust
- **Name**: `SC Project Full System Exhaust`
- **Slug**: `sc-project-full-system-exhaust`
- **Description**: `Complete racing exhaust system with carbon fiber silencer. Used in WorldSBK championship.`
- **Short Description**: `WorldSBK racing exhaust with carbon fiber`
- **Price**: `165000`
- **Currency**: `LKR`
- **Brand**: `SC Project`
- **SKU**: `SCP-FULL-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `10`
- **Is New**: ✅ Yes
- **Rating**: `4.7`
- **Review Count**: `41`
- **Category**: Select **Performance Exhaust**
- **Images**:
  - `https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80`
  - `https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Material", "value": "Stainless Steel + Carbon"},
  {"key": "Power Increase", "value": "+7.2 HP"},
  {"key": "Weight Reduction", "value": "-3.8 kg"},
  {"key": "Homologation", "value": "Track Only"}
]
```
- **Tags**: `exhaust, carbon, racing, worldsbk`
- Click **Save** → **Publish**

### Product 7: Pirelli Diablo Supercorsa SP V4 Tires
- **Name**: `Pirelli Diablo Supercorsa SP V4 Tires`
- **Slug**: `pirelli-diablo-supercorsa-sp-v4`
- **Description**: `Dual-compound racing tire for track days and aggressive street riding. Excellent grip and consistency.`
- **Short Description**: `Track-focused racing tire with dual compound`
- **Price**: `45000`
- **Currency**: `LKR`
- **Brand**: `Pirelli`
- **SKU**: `PIR-DSC-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `30`
- **Featured**: ✅ Yes
- **Is Best Seller**: ✅ Yes
- **Rating**: `4.8`
- **Review Count**: `89`
- **Category**: Select **Racing Tires**
- **Images**:
  - `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80`
  - `https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Compound", "value": "Dual Compound"},
  {"key": "Type", "value": "Track/Aggressive Street"},
  {"key": "Sizes Available", "value": "120/70-17, 200/55-17"},
  {"key": "Warm-up Time", "value": "2-3 laps"}
]
```
- **Tags**: `tires, pirelli, track, racing`
- Click **Save** → **Publish**

### Product 8: Michelin Power Slick 2 Racing Tires
- **Name**: `Michelin Power Slick 2 Racing Tires`
- **Slug**: `michelin-power-slick-2`
- **Description**: `Pure racing slick tire for track use. Maximum grip and heat resistance for competitive racing.`
- **Short Description**: `Professional racing slick for maximum grip`
- **Price**: `52000`
- **Currency**: `LKR`
- **Brand**: `Michelin`
- **SKU**: `MCH-PS2-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `25`
- **Featured**: ✅ Yes
- **Is New**: ✅ Yes
- **Rating**: `5`
- **Review Count**: `54`
- **Category**: Select **Racing Tires**
- **Images**:
  - `https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80`
  - `https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Compound", "value": "Single Racing Compound"},
  {"key": "Type", "value": "Track Only (Slick)"},
  {"key": "Sizes Available", "value": "120/70-17, 190/55-17"},
  {"key": "Operating Temp", "value": "80-120°C"}
]
```
- **Tags**: `tires, slick, racing, michelin`
- Click **Save** → **Publish**

### Product 9: Ohlins TTX GP Rear Shock
- **Name**: `Ohlins TTX GP Rear Shock`
- **Slug**: `ohlins-ttx-gp-rear-shock`
- **Description**: `MotoGP-derived rear shock absorber. Fully adjustable with racing-grade performance.`
- **Short Description**: `MotoGP technology rear shock absorber`
- **Price**: `195000`
- **Currency**: `LKR`
- **Brand**: `Ohlins`
- **SKU**: `OHL-TTX-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `6`
- **Rating**: `4.9`
- **Review Count**: `31`
- **Category**: Select **Suspension Systems**
- **Images**:
  - `https://images.unsplash.com/photo-1599819177818-f9e8e3a08c1c?w=800&q=80`
  - `https://images.unsplash.com/photo-1558618666-1ac11a0d0b8f?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Type", "value": "TTX GP Twin-Tube"},
  {"key": "Adjustments", "value": "Compression/Rebound/Preload"},
  {"key": "Material", "value": "Aluminum/Steel"},
  {"key": "Compatibility", "value": "Most Sport Bikes"}
]
```
- **Tags**: `suspension, ohlins, racing, motogp`
- Click **Save** → **Publish**

### Product 10: KYB Racing Front Fork Kit
- **Name**: `KYB Racing Front Fork Kit`
- **Slug**: `kyb-racing-front-fork-kit`
- **Description**: `Complete front fork upgrade kit with racing internals. Improved damping and adjustability.`
- **Short Description**: `Racing fork kit with improved damping`
- **Price**: `145000`
- **Currency**: `LKR`
- **Brand**: `KYB`
- **SKU**: `KYB-FORK-001`
- **In Stock**: ✅ Yes
- **Stock Quantity**: `8`
- **Is New**: ✅ Yes
- **Rating**: `4.7`
- **Review Count**: `23`
- **Category**: Select **Suspension Systems**
- **Images**:
  - `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80`
  - `https://images.unsplash.com/photo-1591541773779-0b8c0f948d97?w=800&q=80`
- **Specifications**:
```json
[
  {"key": "Type", "value": "Racing Cartridge Kit"},
  {"key": "Adjustments", "value": "Compression/Rebound"},
  {"key": "Oil Included", "value": "Yes (Racing Grade)"},
  {"key": "Spring Rate", "value": "Adjustable"}
]
```
- **Tags**: `suspension, fork, racing, kyb`
- Click **Save** → **Publish**

---

## Step 4: Verify Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable these permissions:
   - **Category**: ✅ find, ✅ findOne
   - **Product**: ✅ find, ✅ findOne
3. Click **Save**

---

## Step 5: Check Frontend

1. Open your frontend: `http://localhost:3000`
2. You should now see:
   - 5 racing motorcycle categories in navbar
   - 10 racing motorcycle products
   - Featured products on homepage

## Done! 🎉

Your Veloce Moto site now has professional racing motorcycle data!
