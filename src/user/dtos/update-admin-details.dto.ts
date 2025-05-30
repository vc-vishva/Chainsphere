import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateAdminDto } from '../../auth/dtos/create.admin.dto';

export class UpdateMerchantDto extends PartialType(PickType(CreateAdminDto, ['profilePicture'] as const)) {}
