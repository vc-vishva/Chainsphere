import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminTransactionsDto } from './dtos/admin-trans';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly transactionsService: TransactionService) {}

  @Get('transactions')
  async getAllTransactions(@Query() query: AdminTransactionsDto) {
    return this.transactionsService.getAllTransactions(query);
  }
}
