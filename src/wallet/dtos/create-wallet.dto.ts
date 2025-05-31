import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
