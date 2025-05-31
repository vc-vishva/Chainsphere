// user-transactions.dto.ts

import { IsOptional, IsNumber, Min } from "class-validator";

export class UserTransactionsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
