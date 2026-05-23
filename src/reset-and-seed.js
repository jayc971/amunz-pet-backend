// Combined script to clear old data and import new racing motorcycle data

const { categories, products } = require('./seed-data');

async function clearAllData() {
  const apiUrl = 'http://localhost:1337/api';

  console.log('🗑️  Step 1: Clearing old data...\n');

  try {
    // Delete all products first
    const productsResponse = await fetch(`${apiUrl}/products?pagination[limit]=1000`);
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      const productsList = productsData.data;

      console.log(`📦 Found ${productsList.length} products to delete`);

      for (const product of productsList) {
        const productId = product.id || product.documentId;
        try {
          await fetch(`${apiUrl}/products/${productId}`, { method: 'DELETE' });
          console.log(`  ✓ Deleted: ${product.name || productId}`);
        } catch (error) {
          console.log(`  ✗ Error deleting product ${productId}`);
        }
      }
    }

    // Delete all categories
    const categoriesResponse = await fetch(`${apiUrl}/categories?pagination[limit]=1000`);
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      const categoriesList = categoriesData.data;

      console.log(`\n📁 Found ${categoriesList.length} categories to delete`);

      for (const category of categoriesList) {
        const categoryId = category.id || category.documentId;
        try {
          await fetch(`${apiUrl}/categories/${categoryId}`, { method: 'DELETE' });
          console.log(`  ✓ Deleted: ${category.name || categoryId}`);
        } catch (error) {
          console.log(`  ✗ Error deleting category ${categoryId}`);
        }
      }
    }

    console.log('\n✅ Old data cleared!\n');
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

async function importNewData() {
  const apiUrl = 'http://localhost:1337/api';

  console.log('🚀 Step 2: Importing new racing motorcycle data...\n');

  try {
    // Import Categories
    console.log('📁 Importing 5 racing motorcycle categories...');
    const categoryMap = {};

    for (const category of categories) {
      try {
        const response = await fetch(`${apiUrl}/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: category })
        });

        if (response.ok) {
          const result = await response.json();
          categoryMap[category.slug] = result.data.id || result.data.documentId;
          console.log(`  ✓ Created: ${category.name}`);
        } else {
          console.log(`  ✗ Failed: ${category.name}`);
        }
      } catch (error) {
        console.log(`  ✗ Error: ${category.name}`);
      }
    }

    console.log(`\n✅ Imported ${Object.keys(categoryMap).length}/5 categories\n`);

    // Import Products
    console.log('📦 Importing 10 racing motorcycle products...');
    let successCount = 0;

    for (const product of products) {
      try {
        const categoryId = categoryMap[product.category];

        if (!categoryId) {
          console.log(`  ✗ Skipped: ${product.name} (category not found)`);
          continue;
        }

        const productData = { ...product, category: categoryId };
        delete productData.images;

        const response = await fetch(`${apiUrl}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: productData })
        });

        if (response.ok) {
          successCount++;
          console.log(`  ✓ Created: ${product.name}`);
        } else {
          console.log(`  ✗ Failed: ${product.name}`);
        }
      } catch (error) {
        console.log(`  ✗ Error: ${product.name}`);
      }
    }

    console.log(`\n✅ Imported ${successCount}/10 products\n`);
  } catch (error) {
    console.error('❌ Error during import:', error.message);
  }
}

async function resetAndSeed() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  VELOCE MOTO - Database Reset & Seed Script');
  console.log('  Racing Motorcycles Data');
  console.log('═══════════════════════════════════════════════════════\n');

  // Clear old data
  await clearAllData();

  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Import new data
  await importNewData();

  console.log('═══════════════════════════════════════════════════════');
  console.log('  🎉 COMPLETED!');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📝 IMPORTANT: Next Steps\n');
  console.log('1. Go to http://localhost:1337/admin');
  console.log('2. Navigate to Content Manager');
  console.log('3. PUBLISH all categories (5 items)');
  console.log('4. PUBLISH all products (10 items)');
  console.log('5. Go to Settings > Users & Permissions > Public');
  console.log('6. Enable find & findOne for Category and Product');
  console.log('7. Refresh your frontend at http://localhost:3000\n');
  console.log('═══════════════════════════════════════════════════════\n');
}

// Run the reset and seed
resetAndSeed();
