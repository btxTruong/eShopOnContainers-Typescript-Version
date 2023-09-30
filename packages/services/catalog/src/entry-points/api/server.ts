import { config } from '@config';
import { app } from '@entry-point/api/app';
import { errorHandler, setAppNameForErrorHandling } from '@eshop/error-handler';
import { logger } from '@eshop/logger';
import getDBConn from '@infra/database/connection';
import express from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

let connection: Server;

async function setupDeps() {
  // validate schema
  config.validate();
  // setup log
  logger.configureLogger(
    {
      prettyPrint: Boolean(config.get('logger.prettyPrint'))
    },
    true
  );
  // set app name
  setAppNameForErrorHandling('catalog-service');
  // setup db
  await getDBConn();
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

export async function startWebServer(): Promise<AddressInfo> {
  // setup dependencies before run server
  await setupDeps();

  const expressApp = app();
  return await openConnection(expressApp);
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
