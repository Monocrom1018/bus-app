import { utilities } from 'nest-winston';
import { Logger as logger, transports, format } from 'winston';

export const winston = {
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.File({
      filename: 'log/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'log/info.log',
      level: 'info',
    }),
    new transports.Console({
      format: format.combine(format.timestamp(), utilities.format.nestLike()),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'log/exceptions.log',
    }),
  ],
};
