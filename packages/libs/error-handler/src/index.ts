import { logger } from '@eshop/logger';
import * as Http from 'http';
import { createHttpTerminator } from 'http-terminator';
import * as util from 'util';

let APP_NAME;
let httpServerRef: Http.Server;

export class AppError extends Error {
  constructor(
    public name: string,
    public message: string,
    public HTTPStatus: number = 500,
    public isTrusted = true,
    public cause?: unknown,
    public appName?: string
  ) {
    super(message);
    this.appName = APP_NAME;
  }
}

export function setAppNameForErrorHandling(appName: string) {
  if (!APP_NAME) {
    APP_NAME = appName;
  }
}

function normalizeError(errorToHandle: unknown): AppError {
  if (errorToHandle instanceof AppError) {
    return errorToHandle;
  }
  if (errorToHandle instanceof Error) {
    const appError = new AppError(errorToHandle.name, errorToHandle.message);
    appError.stack = errorToHandle.stack;
    return appError;
  }
  // meaning it could be any type,
  const inputType = typeof errorToHandle;
  return new AppError(
    'general-error',
    `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(
      errorToHandle
    )}`
  );
}

async function terminateHttpServerAndExit() {
  const httpTerminator = createHttpTerminator({
    server: httpServerRef
  });
  await httpTerminator.terminate();
  process.exit();
}

export const errorHandler = {
  // Listen to the global process-level error events
  listenToErrorEvents: (httpServer: Http.Server) => {
    httpServerRef = httpServer;
    process.on('uncaughtException', async (error) => {
      await errorHandler.handleError(error);
    });

    process.on('unhandledRejection', async (reason) => {
      await errorHandler.handleError(reason);
    });

    process.on('SIGTERM', async () => {
      logger.error('App received SIGTERM event, try to gracefully close the server');
      await terminateHttpServerAndExit();
    });

    process.on('SIGINT', async () => {
      logger.error('App received SIGINT event, try to gracefully close the server');
      await terminateHttpServerAndExit();
    });
  },

  handleError: async (errorToHandle: unknown) => {
    try {
      const appError: AppError = normalizeError(errorToHandle);
      logger.error(appError.message, appError);
      if (!appError.isTrusted) {
        await terminateHttpServerAndExit();
      }
    } catch (handlingError: unknown) {
      // Not using the logger here because it might have failed
      process.stdout.write(
        'The error handler failed, here are the handler failure and then the origin error that it tried to handle'
      );
      process.stdout.write(JSON.stringify(handlingError));
      process.stdout.write(JSON.stringify(errorToHandle));
    }
  }
};
