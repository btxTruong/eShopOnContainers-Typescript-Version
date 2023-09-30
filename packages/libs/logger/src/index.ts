import { Logger, pino } from 'pino';

import { LoggerConfiguration } from './definition';

class LoggerWrapper {
  private logger: Logger | null = null;

  getInitializeLogger(): Logger {
    this.configureLogger({ prettyPrint: true }, false);
    return this.logger!;
  }

  configureLogger(configuration: Partial<LoggerConfiguration>, overrideIfExists = true): void {
    if (this.logger === null || overrideIfExists) {
      this.logger = pino({
        level: configuration.level ?? 'info',
        transport: configuration.prettyPrint
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                sync: true
              }
            }
          : undefined,
        formatters: {
          level: (label) => {
            return { severity: label.toUpperCase() };
          }
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        redact: configuration.redactPaths
      });
    }
  }

  debug(message: string, metadata?: object): void {
    this.getInitializeLogger().debug(message, metadata);
  }

  error(message: string, metadata?: object): void {
    this.getInitializeLogger().error(message, metadata);
  }

  info(message: string, metadata?: object): void {
    this.getInitializeLogger().info(message, metadata);
  }

  warn(message: string, metadata?: object): void {
    this.getInitializeLogger().warn(message, metadata);
  }
}

export const logger = new LoggerWrapper();
