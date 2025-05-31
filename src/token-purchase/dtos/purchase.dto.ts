import { IsNumber, Min, IsString } from 'class-validator';

export class PurchaseDto {
  @IsNumber()
  @Min(1)
  tokenAmount: number;

  @IsString()
  currency: string;

  @IsString()
  userId: string; // You can change it to ObjectId based on auth
}
