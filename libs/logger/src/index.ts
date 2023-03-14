import { Logger, LoggerConfiguration } from './definition';
import PinoLogger from './pino.logger';

export class LoggerWrapper implements Logger {
  #logger: Logger | null = null;

  #getInitializeLogger(): Logger {
    this.configureLogger({}, false);
    return this.#logger!;
  }

  configureLogger(
    configuration: Partial<LoggerConfiguration>,
    overrideIfExists = true
  ): void {
    if (this.#logger === null || overrideIfExists) {
      this.#logger = new PinoLogger(
        configuration.level || 'info',
        configuration.prettyPrint || false
      );
    }
  }

  resetLogger() {
    this.#logger = null;
  }

  debug(message: string, metadata?: object): void {
    this.#getInitializeLogger().debug(
      message,
      metadata
    );
  }

  error(message: string, metadata?: object): void {
    this.#getInitializeLogger().error(
      message,
      metadata
    );
  }

  info(message: string, metadata?: object): void {
    // If never initialized, the set default configuration
    this.#getInitializeLogger().info(
      message,
      metadata
    );
  }

  warning(message: string, metadata?: object): void {
    this.#getInitializeLogger().warning(
      message,
      metadata
    );
  }
}

export const logger = new LoggerWrapper();
