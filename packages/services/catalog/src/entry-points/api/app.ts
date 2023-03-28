import express from 'express';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@swagger-document';
import { apiV1Route } from './routes';
import { logger } from '@eshop/logger';
import PinoHttp from 'pino-http';
import { errorHandler } from '@eshop/error-handler';

export function app() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(PinoHttp({
    logger: logger.getInitializeLogger(),
    level: 'info'
  }));

  app.get('/', async (req, res) => {
    res.redirect('/swagger/v1');
  });
  app.get('/live', (req, res) => {
    res.json({ message: 'yes' });
  });
  app.use('/api/v1', apiV1Route);
  app.use('/swagger/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(async (error: any, req, res, _next) => {
    if (error && typeof error === 'object') {
      if (error.isTrusted === undefined || error.isTrusted === null) {
        error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
      }
    }
    // centralize error handler
    await errorHandler.handleError(error);
    res.status(error?.HTTPStatus || 500).end();
  });

  return app;
}
