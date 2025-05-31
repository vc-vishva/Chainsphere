import { IsMongoId, IsOptional } from 'class-validator';

export class GenerateReferralDto {
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsMongoId()
  referrerId?: string;
}
