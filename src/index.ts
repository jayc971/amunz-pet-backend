import type { Core } from '@strapi/strapi';
import { seedRacingMotorcycleDataV2 } from './seed/racing-motorcycle-data-v2';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed racing motorcycle data (only runs if SEED_DATA env variable is set)
    if (process.env.SEED_DATA === 'true') {
      await seedRacingMotorcycleDataV2(strapi);
    }
    // Set public permissions for Product and Category APIs
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const permissions = [
        // Product permissions
        { action: 'api::product.product.find' },
        { action: 'api::product.product.findOne' },
        // Category permissions
        { action: 'api::category.category.find' },
        { action: 'api::category.category.findOne' },
        // Brand permissions
        { action: 'api::brand.brand.find' },
        { action: 'api::brand.brand.findOne' },
      ];

      for (const permission of permissions) {
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action: permission.action,
              role: publicRole.id,
            },
          });

        if (existingPermission && !existingPermission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: existingPermission.id },
              data: { enabled: true },
            });
        }
      }

      console.log('Public permissions configured for Product, Category, and Brand APIs');
    }
  },
};
