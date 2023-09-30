import { logger } from '@eshop/logger';
import getDBConn from '@infra/database/connection';
import { SequelizeStorage, Umzug } from 'umzug';

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/**/*.ts', { cwd: __dirname }],
    resolve: ({ name, path, context }) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
      const migration = require(path!);
      return {
        name,
        up: async () => getDBConn().transaction((t1) => migration.up({ context })),
        down: async () => getDBConn().transaction((t1) => migration.down({ context }))
      };
    }
  },
  context: getDBConn().getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: getDBConn()
  }),
  logger: logger.getInitializeLogger(),
  create: {
    template: (filepath) => [
      [
        filepath,
        `import { QueryInterface } from 'sequelize';

export async function up({ context }: { context: QueryInterface }) {

}

export async function down({ context }: { context: QueryInterface }) {

}
        `
      ]
    ]
  }
});
