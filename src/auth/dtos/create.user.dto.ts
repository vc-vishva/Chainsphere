import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Defaults } from '../../common/configs/default.config';
import { fieldInvalid, maximumLength, minimumLength, validationMessages } from '../../common/configs/messages.config';

export class CreateUserDto {
  @Transform(({ value }): string => (value as string).trim())
  @MinLength(2, { message: minimumLength('First Name', 2) })
  @MaxLength(100, { message: maximumLength('First Name', 100) })
  @Matches(/^[a-zA-Z ]+$/, { message: `First Name ${validationMessages.FIRST_NAME_IS_ALPHA}` })
  @IsNotEmpty({ message: `First Name ${validationMessages.NOT_EMPTY}` })
  @IsString({ message: `First Name ${validationMessages.INVALID_STRING}` })
  firstName: string;

  @Transform(({ value }): string => (value as string).trim())
  @MinLength(2, { message: minimumLength('Last Name', 2) })
  @MaxLength(100, { message: maximumLength('Last Name', 100) })
  @Matches(/^[a-zA-Z ]+$/, { message: `Last Name ${validationMessages.FIRST_NAME_IS_ALPHA}` })
  @IsNotEmpty({ message: `Last Name ${validationMessages.NOT_EMPTY}` })
  @IsString({ message: `Last Name ${validationMessages.INVALID_STRING}` })
  lastName: string;

  @Transform(({ value }): string => (value as string).trim())
  @Matches(Defaults.PASSWORD_REGEX, {
    message: validationMessages.PASSWORD_IS_VALID,
  })
  @IsString()
  @IsNotEmpty({ message: `Password ${validationMessages.NOT_EMPTY}` })
  password: string;

  @Transform(({ value }): string => (value as string).trim().toLowerCase())
  @IsEmail({}, { message: fieldInvalid('Email') })
  @MaxLength(100, { message: maximumLength('Email', 100) })
  @IsNotEmpty({ message: `Email ${validationMessages.NOT_EMPTY}` })
  email: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Please accept terms and condition' })
  acceptTerms: boolean;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  zipCode: string;

  @IsOptional()
  @IsString()
  streetAddress: string;

  @IsOptional()
  @IsString()
  profilePicture: string;
}
