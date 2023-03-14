import convict from "convict";

const config = convict({
  deploymentEnv: {
    doc: 'The deployment env',
    format: ['dev', 'test', 'prod'],
    default: 'dev',
    env: 'DEPLOYMENT_ENV'
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  app: {
    port: {
      doc: 'The Express app port',
      format: 'number',
      default: 0,
      nullable: true,
      env: 'APP_PORT'
    }
  },
  db: {
    user: {
      doc: 'Database username',
      format: 'string',
      default: 'postgres',
      nullable: false,
      env: 'DB_USERNAME'
    },
    port: {
      doc: 'DB port',
      format: 'port',
      default: 5432,
      nullable: false,
      env: 'DB_PORT'
    },
    password: {
      doc: 'DB password',
      format: 'string',
      sensitive: true,
      nullable: false,
      env: 'DB_PASSWORD',
      default: ''
    },
    dbName: {
      doc: 'DB name',
      format: 'string',
      default: 'eshop',
      nullable: false,
      env: 'DB_NAME'
    }
  }
});

config.validate();

export {
  config
};
