import { DECIMAL, INTEGER, QueryInterface, STRING } from 'sequelize';

export async function up({ context }: { context: QueryInterface }) {
  await context.sequelize.query(`
      CREATE SEQUENCE catalog_brand_hilo
      INCREMENT 10;

      CREATE SEQUENCE catalog_hilo
      INCREMENT 10;

      CREATE SEQUENCE catalog_type_hilo
      INCREMENT 10;
  `);

  await context.createTable(
    {
      tableName: 'catalog_brands'
    },
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      brand: {
        allowNull: false,
        type: STRING(100)
      }
    }
  );

  await context.createTable(
    {
      tableName: 'catalog_types'
    },
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      type: {
        allowNull: false,
        type: STRING(100)
      }
    }
  );

  await context.createTable(
    {
      tableName: 'catalogs'
    },
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      type: {
        allowNull: false,
        type: STRING(100)
      },
      catalog_brand_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'catalog_brands',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      catalog_type_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'catalog_types',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      description: {
        type: STRING
      },
      name: {
        type: STRING(50),
        allowNull: false
      },
      picture_uri: {
        type: STRING
      },
      price: {
        type: DECIMAL,
        allowNull: false
      }
    }
  );

  await context.sequelize.query(
    `
      CREATE INDEX IF NOT EXISTS catalog_catalog_brand_fk_idx ON catalogs (catalog_brand_id);
      CREATE INDEX IF NOT EXISTS catalog_catalog_type_fk_idx ON catalogs (catalog_type_id);
    `
  );
}

export async function down({ context }: { context: QueryInterface }) {
  await context.sequelize.query(
    `
    DROP SEQUENCE catalog_brand_hilo;
    DROP SEQUENCE catalog_hilo;
    DROP SEQUENCE catalog_type_hilo;
    `
  );

  await context.dropTable('catalogs');
  await context.dropTable('catalog_types');
  await context.dropTable('catalog_brands');

  await context.removeIndex('catalogs', 'catalog_catalog_brand_fk_idx');
  await context.removeIndex('catalogs', 'catalog_catalog_type_fk_idx');
}
