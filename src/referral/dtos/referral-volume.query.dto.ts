import { IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class ReferralVolumeQueryDto {
  @IsMongoId()
  @Type(() => String)
  userId: string;
}
