import { PickType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { fieldRequired, maximumLength, minimumLength, validationMessages } from '../../common/configs/messages.config';
import { CreateUserDto } from './create.user.dto';

export class CreateAdminDto extends PickType(CreateUserDto, ['password', 'email', 'profilePicture'] as const) {
  @Transform(({ value }): string => (value as string).trim())
  @IsString()
  @MinLength(2, { message: minimumLength('Merchant Name', 2) })
  @MaxLength(50, { message: maximumLength('Merchant Name', 50) })
  @IsNotEmpty({ message: `Merchant Name ${validationMessages.NOT_EMPTY}` })
  merchantName: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Please accept terms and condition' })
  acceptTerms: boolean;

  @IsString()
  @IsNotEmpty({ message: fieldRequired('Phone number') })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  paymentGateway: string;
}
