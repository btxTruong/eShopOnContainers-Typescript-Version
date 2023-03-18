import { startWebServer } from '@entry-point/api/server';
import { AppError, errorHandler } from '@eshop/error-handler';
import { logger } from '@eshop/logger';

async function start() {
  return Promise.all([startWebServer()]);
}

start()
  .then((res) => {
    logger.info(`The app has started successfully ${JSON.stringify(res)}}`);
  })
  .catch((error) => errorHandler.handleError(
      new AppError('startup-failure', error.message, 500, false, error)
    )
  );
