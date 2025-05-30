import { PickType } from '@nestjs/mapped-types';
import { UserLoginDto } from './login.dto';

export class AdminForgotPasswordDto extends PickType(UserLoginDto, ['email'] as const) {}
