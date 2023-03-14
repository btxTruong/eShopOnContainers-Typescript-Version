import { DestinationStream, Logger as PinoLoggerImpl, pino } from 'pino';
import { LOG_LEVELS, Logger } from './definition';

export default class PinoLogger implements Logger {
  readonly #logger: PinoLoggerImpl;

  constructor(
    level: LOG_LEVELS,
    prettyPrintEnabled: boolean,
    destStream?: DestinationStream | string,
    redactPaths?: string[]
  ) {
    this.#logger = pino({
      level,
      transport: prettyPrintEnabled
        ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            sync: true,
          },
        }
        : undefined,
      formatters: {
        level: (label) => {
          return { severity: label.toUpperCase() };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      redact: redactPaths
    });
  }

  debug(message: string, metadata?: object): void {
    if (metadata) {
      this.#logger.debug(metadata, message);
    } else {
      this.#logger.debug(message);
    }
  }

  error(message: string, metadata?: object): void {
    if (metadata) {
      this.#logger.error(metadata, message);
    } else {
      this.#logger.error(message);
    }
  }

  info(message: string, metadata?: object): void {
    if (metadata) {
      this.#logger.info(metadata, message);
    } else {
      this.#logger.info(message);
    }
  }

  warning(message: string, metadata?: object): void {
    if (metadata) {
      this.#logger.warn(metadata, message);
    } else {
      this.#logger.warn(message);
    }
  }
}
