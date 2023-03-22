import { DATE, INTEGER, QueryInterface, STRING, UUID } from 'sequelize';

export async function up({ context }: { context: QueryInterface }) {
  await context.sequelize.query(
    `
    CREATE EXTENSION "uuid-ossp";
    `
  );
  await context.createTable('integration_event_logs', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: UUID,
    },
    content: {
      allowNull: false,
      type: STRING
    },
    creation_time: {
      allowNull: false,
      type: DATE
    },
    event_type_name: {
      allowNull: false,
      type: STRING
    },
    state: {
      allowNull: false,
      type: INTEGER
    },
    times_sent: {
      allowNull: false,
      type: INTEGER
    },
    transaction_id: {
      type: STRING
    }
  });
}

export async function down({ context }: { context: QueryInterface }) {
  await context.dropTable('integration_event_logs');
}
