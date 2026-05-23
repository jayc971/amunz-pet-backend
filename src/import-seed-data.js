const { categories, products } = require('./seed-data');

async function importData() {
  const apiUrl = 'http://localhost:1337/api';

  console.log('🚀 Starting data import...\n');

  try {
    // Step 1: Import Categories
    console.log('📁 Importing categories...');
    const categoryMap = {};

    for (const category of categories) {
      try {
        const response = await fetch(`${apiUrl}/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: category })
        });

        if (response.ok) {
          const result = await response.json();
          categoryMap[category.slug] = result.data.id || result.data.documentId;
          console.log(`  ✓ Created category: ${category.name}`);
        } else {
          const error = await response.text();
          console.log(`  ✗ Failed to create category ${category.name}:`, error);
        }
      } catch (error) {
        console.log(`  ✗ Error creating category ${category.name}:`, error.message);
      }
    }

    console.log(`\n✅ Categories imported: ${Object.keys(categoryMap).length}/${categories.length}\n`);

    // Step 2: Import Products
    console.log('📦 Importing products...');
    let successCount = 0;

    for (const product of products) {
      try {
        // Get category ID
        const categoryId = categoryMap[product.category];

        if (!categoryId) {
          console.log(`  ✗ Skipping product ${product.name}: Category not found`);
          continue;
        }

        // Prepare product data
        const productData = {
          ...product,
          category: categoryId
        };
        delete productData.images; // Remove images array for now, add separately if needed

        const response = await fetch(`${apiUrl}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: productData })
        });

        if (response.ok) {
          successCount++;
          console.log(`  ✓ Created product: ${product.name}`);
        } else {
          const error = await response.text();
          console.log(`  ✗ Failed to create product ${product.name}:`, error);
        }
      } catch (error) {
        console.log(`  ✗ Error creating product ${product.name}:`, error.message);
      }
    }

    console.log(`\n✅ Products imported: ${successCount}/${products.length}\n`);
    console.log('🎉 Data import completed!\n');
    console.log('📝 Next steps:');
    console.log('   1. Go to http://localhost:1337/admin');
    console.log('   2. Navigate to Content Manager');
    console.log('   3. Make sure to publish all categories and products');
    console.log('   4. Set permissions for public API access in Settings > Users & Permissions > Public\n');

  } catch (error) {
    console.error('❌ Fatal error during import:', error);
  }
}

// Run the import
importData();
