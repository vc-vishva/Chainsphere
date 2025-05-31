import { IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class ReferralAmbassadorStatusQueryDto {
  @IsMongoId()
  @Type(() => String)
  userId: string;
}
