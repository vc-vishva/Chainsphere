import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Description - Role Decorator
 * @param roles
 * @returns role
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
