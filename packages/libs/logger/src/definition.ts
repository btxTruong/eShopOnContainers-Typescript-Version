export type LOG_LEVELS = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface LoggerConfiguration {
  level: LOG_LEVELS;
  prettyPrint: boolean;
  redactPaths?: string[];
}
