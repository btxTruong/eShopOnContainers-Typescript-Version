import convict from "convict";

const config = convict({
  env: {
    doc: 'The deployment env',
    format: ['dev', 'test', 'prod'],
    default: 'dev',
    env: 'DEPLOYMENT_ENV'
  },
  nodeEnv: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  app: {
    port: {
      doc: 'The Express app port',
      format: Number,
      default: 7000,
      nullable: true,
      env: 'APP_PORT'
    },
    paginationPageSize: {
      doc: 'Pagination page size default following some standard pagination https://www.django-rest-framework.org/api-guide/pagination/',
      format: Number,
      default: 10,
      nullable: false,
      env: 'PAGINATION_PAGE_SIZE'
    }
  },
  logger: {
    level: {
      doc: 'Which type of logger',
      format: ['debug', 'info', 'warn', 'error', 'critical'],
      default: 'info',
      nullable: false,
      env: 'LOGGER_LEVEL',
    },
    prettyPrint: {
      doc: 'Weather the logger should be configured to pretty print the output',
      format: Boolean,
      default: true,
      nullable: false,
      env: 'PRETTY_PRINT_LOG',
    },
  },
  db: {
    user: {
      doc: 'Database username',
      format: String,
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
      format: String,
      sensitive: true,
      nullable: false,
      env: 'DB_PASSWORD',
      default: ''
    },
    dbName: {
      doc: 'DB name',
      format: String,
      default: 'eshop',
      nullable: false,
      env: 'DB_NAME'
    }
  }
});

export {
  config
};
