import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { fieldInvalid, fieldRequired } from '../../common/configs/messages.config';
import { Transform } from 'class-transformer';

export class UserLoginDto {
  @Transform(({ value }): string => (value as string).toLowerCase())
  @IsEmail({}, { message: fieldInvalid('Email') })
  @IsNotEmpty({ message: fieldRequired('Email') })
  email: string;

  @IsString()
  @IsNotEmpty({ message: fieldRequired('Password') })
  password: string;
}
