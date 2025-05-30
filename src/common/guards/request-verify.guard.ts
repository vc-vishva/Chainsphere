import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { errorMessages } from '../configs/messages.config';
import { JwtTokenPayload } from '../types';
import { UserService } from 'src/user/user.service';

/**
 * Description - Auth Guard
 */
@Injectable()
export class RequestVerify implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  /**
   * Description - Check valid request & append user info to request object
   * @param context ExecutionContext
   * @returns boolean value
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(errorMessages.INVALID_TOKEN);
    }

    const payload: JwtTokenPayload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('SECRET_KEY'),
    });

    const user = await this.userService.getUserJson({
      _id: payload._id,
      email: payload.email,
    });

    if (!user) {
      throw new UnauthorizedException(errorMessages.USER_UNAUTHORIZED);
    }

    request['user'] = user;

    return true;
  }

  /**
   * Description - Extract token from header function
   * @param request
   * @returns Extracted token from header
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
