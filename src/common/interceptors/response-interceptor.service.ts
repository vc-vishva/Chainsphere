import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { CommonResponse } from '../types';

/**
 * Description - Response Interceptor provider
 */
@Injectable()
export class ResponseInterceptorService implements NestInterceptor {
  /**
   * Description - Change Status of Response
   * @param context
   * @param next
   * @returns Common Response
   */
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((sentResponse: CommonResponse<any>) => {
        if (sentResponse?.status) {
          response.status(sentResponse.statusCode);
        }
        return sentResponse;
      }),
    );
  }
}
