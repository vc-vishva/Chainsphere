import { WinstonModuleOptions, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDailyRotate from 'winston-daily-rotate-file';
import * as path from 'path';
import { Defaults } from './default.config';

/**
 * Description - Logger Middleware
 * @returns
 */
export const winstonOptions = (): WinstonModuleOptions => {
  const logsFilePath = path.join(path.resolve(), `./logs/`);
  const dailyRotateTransport = new winstonDailyRotate({
    filename: logsFilePath + '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
  });

  return {
    exitOnError: false,
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.json()),
    transports: [
      new winston.transports.File({
        filename: Defaults.COMBINED_LOG_PATH,
        maxsize: 1048576,
      }),
      new winston.transports.File({
        filename: Defaults.ERROR_LOG_PATH,
        level: 'error',
        maxsize: 8388608,
      }),
      dailyRotateTransport,
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          utilities.format.nestLike('EveryGive', {
            colors: true,
            prettyPrint: false,
          }),
        ),
      }),
    ],
  };
};
