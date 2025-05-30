import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';

export class SaveUserEmailDto extends PickType(CreateUserDto, ['email'] as const) {}
