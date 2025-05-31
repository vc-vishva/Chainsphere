// dto.ts
import { IsMongoId, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class StartSaleDto {
  @IsNotEmpty() name: string;
  @IsNumber() tokenCap: number;
  @IsNumber() price: number;
  @IsDateString() startDate: string;
  @IsDateString() endDate: string;
}

export class ExtendSaleDto {
  @IsMongoId() salePhaseId: string;
  @IsDateString() newEndDate: string;
}

export class EndSaleDto {
  @IsMongoId() salePhaseId: string;
}
