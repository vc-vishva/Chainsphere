import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { fieldInvalid } from '../configs/messages.config';

export class PaginationDto {
  @IsInt({ message: fieldInvalid('Page') })
  @Type(() => Number)
  @IsOptional()
  page: number;

  @IsInt({ message: fieldInvalid('Limit') })
  @Type(() => Number)
  @IsOptional()
  limit: number;
}
