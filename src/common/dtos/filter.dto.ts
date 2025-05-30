import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortFields } from '../types';

export class FilterDto {
  @IsString()
  @IsOptional()
  sortKey?: string;

  @IsString()
  @IsEnum(SortFields)
  @IsOptional()
  sortValue?: string;

  @Transform(({ value }): string => (value as string).trim())
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  causeStatus?: string;

  @IsString()
  @IsOptional()
  donationType?: string;
}
