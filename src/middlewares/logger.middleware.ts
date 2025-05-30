import { Inject, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

/**
 *  Description -Logger Middleware
 */
export class LoggerMiddleware implements NestMiddleware {
  /**
   * Description - Logger Middleware Dependencies
   * @param logger
   */
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  /**
   * Description - Log Necessary Things From Request And Response
   * @param req
   * @param res
   * @param next
   */
  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || '';

      this.logger.info(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        LoggerMiddleware.name,
      );
    });
    next();
  }
}
