import { Controller, Get, Query, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UserTransactionsDto } from 'src/user/dtos/user-transactions.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

}
