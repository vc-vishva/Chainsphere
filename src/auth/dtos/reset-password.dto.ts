import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserLoginDto } from './login.dto';

export class ResetPasswordDto extends PickType(UserLoginDto, ['password'] as const) {
  @IsNotEmpty()
  @IsString()
  token?: string;
}
