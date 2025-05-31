import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminTransactionsDto } from './dtos/admin-trans';
import { TransactionService } from 'src/transaction/transaction.service';
import { StartSaleDto, ExtendSaleDto, EndSaleDto } from './dtos/sale.dto';
import { AdminSaleService } from './admin-sale.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly transactionsService: TransactionService,
    private readonly adminSaleService: AdminSaleService,
   ) {}

  @Get('transactions')
  async getAllTransactions(@Query() query: AdminTransactionsDto) {
    return this.transactionsService.getAllTransactions(query);
  }

  @Post('sale/start')
  startSale(@Body() dto: StartSaleDto) {
    return this.adminSaleService.startSale(dto);
  }

  @Post('sale/extend')
  extendSale(@Body() dto: ExtendSaleDto) {
    return this.adminSaleService.extendSale(dto);
  }

  @Post('sale/end')
  endSale(@Body() dto: EndSaleDto) {
    return this.adminSaleService.endSale(dto);
  }

   @Get('referral-overview')
  getReferralOverview() {
    return this.adminSaleService.getReferralOverview();
  }

  @Get('token-distribution')
  getTokenDistribution() {
    return this.adminSaleService.getTokenDistribution();
  }
  
   @Get('logs')
  getLogs(@Query('limit') limit?: number, @Query('skip') skip?: number) {
    return this.adminService.getLogs({ limit, skip });
  }
}
