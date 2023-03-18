import { Server } from 'http';
import { AddressInfo } from 'net';
import { config } from '@config';
import { logger } from '@eshop/logger';
import express from 'express';
import { errorHandler, setAppNameForErrorHandling } from '@eshop/error-handler';
import { app } from '@entry-point/api/app';
import getDBConn from '@infra/database/connection';

let connection: Server;

async function defineErrorHandlingMiddleware(expressApp: express.Application) {
  expressApp.use(
    async (
      error: any,
      req: express.Request,
      res: express.Response,
    ) => {
      if (error && typeof error === 'object') {
        if (error.isTrusted === undefined || error.isTrusted === null) {
          error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
        }
      }
      // centralize error handler
      await errorHandler.handleError(error);
      res.status(error?.HTTPStatus || 500).end();
    }
  );
}

export async function startWebServer(): Promise<AddressInfo> {
  // validate schema
  config.validate();
  // setup log

  logger.configureLogger(
    {
      prettyPrint: Boolean(
        config.get('logger.prettyPrint')
      ),
    },
    true
  );
  // set app name
  setAppNameForErrorHandling('catalog-service');
  // setup db
  await getDBConn();

  await defineErrorHandlingMiddleware(app);
  return await openConnection(app);
}

export async function stopWebServer() {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

async function openConnection(expressApp: express.Application): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const portToListenTo = config.get('app.port');
    const webServerPort = portToListenTo || 0;
    logger.info(`Server is about to listen to port ${webServerPort}`);
    connection = expressApp.listen(webServerPort, () => {
      errorHandler.listenToErrorEvents(connection);
      resolve(connection.address() as AddressInfo);
    });
  });
}
