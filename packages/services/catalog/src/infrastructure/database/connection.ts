import { config } from '@config';
import { logger } from '@eshop/logger';
import { modelsArray } from '@infra/database/models';
import cls from 'cls-hooked';
import { Sequelize } from 'sequelize-typescript';

let dbConn: Sequelize;

export const dbNamespace = cls.createNamespace('db-transaction');
Object.getPrototypeOf(Sequelize).useCLS(dbNamespace);

export default function getDBConn() {
  if (!dbConn) {
    dbConn = new Sequelize(
      config.get('db.dbName'),
      config.get('db.user'),
      config.get('db.password'),
      {
        port: config.get('db.port'),
        dialect: 'postgres',
        models: modelsArray,
        benchmark: true,
        logging: (sql: string, duration?: number) => {
          logger.info(`RUN ${sql} =>>>>> IN ${duration}`);
        },
        logQueryParameters: true,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
  }
  return dbConn;
}
