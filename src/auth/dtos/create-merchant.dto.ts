import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLinkToPayMerchantDto {
  @IsString()
  @IsNotEmpty()
  feeTemplateId: string;

  @IsString()
  @IsNotEmpty()
  agent: string;

  @IsString()
  @IsNotEmpty()
  terminalBuild: string;

  @Transform(({ value }): string => (value as string).trim())
  @IsString()
  linkToPayApiLoginKey: string;

  @Transform(({ value }): string => (value as string).trim())
  @IsString()
  linkToPayApiTransactionKey: string;

  @Transform(({ value }): string => (value as string).trim())
  @IsString()
  linkToPayApiAuthenticationMethod: string;

  @Transform(({ value }): string => (value as string).trim())
  @IsString()
  client: string;
}
