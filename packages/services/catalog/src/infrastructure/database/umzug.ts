import { Umzug, SequelizeStorage } from 'umzug';
import getDBConn from '@infra/database/connection';
import { logger } from '@eshop/logger';


export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/**/*.ts', { cwd: __dirname }],
  },
  context: getDBConn().getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: getDBConn(),
  }),
  logger: logger.getInitializeLogger(),
  create: {
    template: filepath => [
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
