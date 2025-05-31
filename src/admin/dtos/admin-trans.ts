import { IsOptional, IsNumber, IsString, Min } from 'class-validator';

export class AdminTransactionsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  status?: string; // e.g., 'pending', 'confirmed'
}
