import { errorHandler } from '@eshop/error-handler';
import { logger } from '@eshop/logger';
import swaggerDocument from '@swagger-document';
import compression from 'compression';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import PinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';

import { apiV1Route } from './routes';

export function app() {
  const expressApp = express();

  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  expressApp.use(compression());
  expressApp.use(
    PinoHttp({
      logger: logger.getInitializeLogger(),
      level: 'info'
    })
  );

  expressApp.use(
    OpenApiValidator.middleware({
      apiSpec: '@swagger-document',
      validateRequests: true
    })
  );

  expressApp.get('/', async (req, res) => {
    res.redirect('/swagger/v1');
  });
  expressApp.get('/live', (req, res) => {
    res.status(200).json({ message: 'yes' });
  });
  expressApp.use('/api/v1', apiV1Route);
  expressApp.use('/swagger/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  expressApp.use(async (error: any, req, res, _next) => {
    if (error && typeof error === 'object') {
      if (error.isTrusted === undefined || error.isTrusted === null) {
        error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
      }
    }
    // centralize error handler
    await errorHandler.handleError(error);
    res.status(error?.HTTPStatus || 500).end();
  });

  return expressApp;
}
