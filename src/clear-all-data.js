// Script to delete ALL existing categories and products from Strapi

async function clearAllData() {
  const apiUrl = 'http://localhost:1337/api';

  console.log('🗑️  Starting data cleanup...\n');

  try {
    // Step 1: Delete all products
    console.log('📦 Deleting all products...');

    try {
      const productsResponse = await fetch(`${apiUrl}/products?pagination[limit]=1000`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        const products = productsData.data;

        console.log(`  Found ${products.length} products to delete`);

        for (const product of products) {
          const productId = product.id || product.documentId;
          try {
            const deleteResponse = await fetch(`${apiUrl}/products/${productId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });

            if (deleteResponse.ok) {
              console.log(`  ✓ Deleted product: ${product.name || productId}`);
            } else {
              console.log(`  ✗ Failed to delete product: ${productId}`);
            }
          } catch (error) {
            console.log(`  ✗ Error deleting product ${productId}:`, error.message);
          }
        }

        console.log(`\n✅ Deleted ${products.length} products\n`);
      } else {
        console.log('  ⚠️  Could not fetch products');
      }
    } catch (error) {
      console.log('  ✗ Error fetching products:', error.message);
    }

    // Step 2: Delete all categories
    console.log('📁 Deleting all categories...');

    try {
      const categoriesResponse = await fetch(`${apiUrl}/categories?pagination[limit]=1000`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        const categories = categoriesData.data;

        console.log(`  Found ${categories.length} categories to delete`);

        for (const category of categories) {
          const categoryId = category.id || category.documentId;
          try {
            const deleteResponse = await fetch(`${apiUrl}/categories/${categoryId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });

            if (deleteResponse.ok) {
              console.log(`  ✓ Deleted category: ${category.name || categoryId}`);
            } else {
              console.log(`  ✗ Failed to delete category: ${categoryId}`);
            }
          } catch (error) {
            console.log(`  ✗ Error deleting category ${categoryId}:`, error.message);
          }
        }

        console.log(`\n✅ Deleted ${categories.length} categories\n`);
      } else {
        console.log('  ⚠️  Could not fetch categories');
      }
    } catch (error) {
      console.log('  ✗ Error fetching categories:', error.message);
    }

    console.log('🎉 Data cleanup completed!\n');
    console.log('📝 Next step: Run the import script');
    console.log('   node src/import-seed-data.js\n');

  } catch (error) {
    console.error('❌ Fatal error during cleanup:', error);
  }
}

// Run the cleanup
clearAllData();
