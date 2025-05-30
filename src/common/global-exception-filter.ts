import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ResponseHandler } from '../utils/response-handler';
import { CustomAxiosErrorResponse } from './types';
/**
 * Global Exception Filter
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  /**
   * Description - Global Exception Filter Dependencies
   * @param logger
   */
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  /**
   * Description - Catch Exception And Return Common Error Response
   * @param exception
   * @param host
   * @returns
   */
  catch(exception: Error, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error(`Error: method: ${request.method} - url :${request.url} - error : ${exception.stack}`);
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const res = exception.getResponse() as object;

      return response
        .status(statusCode)
        .json(ResponseHandler.error(exception.name, exception.message, statusCode, res['error']));
    }

    if (exception instanceof AxiosError) {
      const data = exception.response?.data as CustomAxiosErrorResponse;

      const statusCode = data?.statusCode || 500;
      const message = data?.message || 'Internal server error';
      const error = data?.error || [];

      return response.status(statusCode).json({
        status: false,
        statusCode,
        message,
        data: [],
        error,
      });
    }

    if (exception.name === 'TokenExpiredError' || exception.message === 'jwt expired') {
      return response.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Token has expired',
        data: [],
        error: exception.message,
      });
    }

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json(ResponseHandler.error(exception.name, exception.message, HttpStatus.BAD_REQUEST));
  }
}
