import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { envConfig } from '../configs/env.config';

export const ApiLoginKey = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  // Extract API login key from headers
  const apiLoginKey = request.headers['api-login-key'] as string;
  const apiSecretKey = request.headers['api-secret-key'] as string;

  const isValid = validateApiLoginKey(apiLoginKey, apiSecretKey);

  if (!isValid) {
    // You may choose to throw an error or handle invalid key here
    throw new UnauthorizedException('Invalid API login key');
  }

  return isValid;
});

function validateApiLoginKey(apiLoginKey: string, apiSecretKey: string): boolean {
  return apiLoginKey === envConfig.apiLoginKey && apiSecretKey === envConfig.apiSecretKey;
}
