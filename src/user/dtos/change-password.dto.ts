import { IsNotEmpty, IsString } from 'class-validator';
import { fieldRequired, validationMessages } from '../../common/configs/messages.config';

/**
 * @ignore
 */
export class ChangePasswordDto {
  @IsString({ message: validationMessages.PASSWORD_IS_VALID })
  @IsNotEmpty({ message: fieldRequired('Password') })
  password: string;

  @IsString({ message: validationMessages.PASSWORD_IS_VALID })
  @IsNotEmpty({ message: fieldRequired('Password') })
  newPassword: string;
}
