import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from '../../auth/dtos/create.user.dto';
import { maximumLength, minimumLength, validationMessages } from '../../common/configs/messages.config';

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, [
    'firstName',
    'lastName',
    'streetAddress',
    'profilePicture',
    'country',
    'state',
    'city',
    'phoneNumber',
    'zipCode',
  ] as const),
) {
  @IsString()
  @MinLength(2, { message: minimumLength('City', 2) })
  @MaxLength(50, { message: maximumLength('City', 50) })
  @IsNotEmpty({ message: `City ${validationMessages.NOT_EMPTY}` })
  city: string;

  @IsString()
  @MinLength(2, { message: minimumLength('State', 2) })
  @MaxLength(50, { message: maximumLength('State', 50) })
  @IsNotEmpty({ message: 'Please select state' })
  state: string;
}
