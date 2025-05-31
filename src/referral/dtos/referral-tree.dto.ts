import { IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class ReferralTreeDto {
  @IsMongoId()
  @Type(() => String)
  userId: string;
}
