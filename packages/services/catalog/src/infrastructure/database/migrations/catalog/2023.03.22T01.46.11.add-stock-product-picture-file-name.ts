import { BOOLEAN, INTEGER, QueryInterface } from 'sequelize';

export async function up({ context }: { context: QueryInterface }) {
  await context.addColumn('catalogs', 'available_stock', {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0
  });

  await context.addColumn('catalogs', 'max_stock_threshold', {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0
  });

  await context.addColumn('catalogs', 'on_reorder', {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  });

  await context.addColumn('catalogs', 'restock_threshold', {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0
  });

  await context.renameColumn('catalogs', 'picture_uri', 'picture_file_name');
}

export async function down({ context }: { context: QueryInterface }) {
  await context.removeColumn('catalogs', 'available_stock');
  await context.removeColumn('catalogs', 'max_stock_threshold');
  await context.removeColumn('catalogs', 'on_reorder');
  await context.removeColumn('catalogs', 'restock_threshold');
  await context.renameColumn('catalogs', 'picture_file_name', 'picture_uri');
}
