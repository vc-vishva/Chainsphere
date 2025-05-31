import { IsMongoId, IsNumber, Min } from 'class-validator';

export class WithdrawDto {
  @IsMongoId()
  userId: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
