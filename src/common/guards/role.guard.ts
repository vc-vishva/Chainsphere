import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithPayload } from '../types';
import { errorMessages } from '../configs/messages.config';
import { ROLES_KEY } from '../decorators/role.decorator';

/**
 * Description - Role Guard
 */
@Injectable()
export class RoleGuard implements CanActivate {
  /**
   * Description - Role Guard Dependencies
   * @param reflector
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * Description - Check role
   * @param context
   * @returns
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<RequestWithPayload>();

    const user = request.user;
    if (!requiredRoles.includes(user.userType)) throw new UnauthorizedException(errorMessages.PERMISSION_DENIED);

    return true;
  }
}
