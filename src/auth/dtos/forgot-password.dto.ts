import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { UserLoginDto } from './login.dto';

export class ForgotPasswordDto extends PickType(UserLoginDto, ['email'] as const) {
  @IsString()
  @IsOptional()
  slug: string;
}
