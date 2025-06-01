import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminTransactionsDto } from './dtos/admin-trans';
import { TransactionService } from 'src/transaction/transaction.service';
import { StartSaleDto, ExtendSaleDto, EndSaleDto } from './dtos/sale.dto';
import { AdminSaleService } from './admin-sale.service';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { RequestVerify } from 'src/common/guards/request-verify.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { UserDocument } from 'src/user/schemas/user.schema';
import { RoleEnum } from 'src/user/types';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly transactionsService: TransactionService,
    private readonly adminSaleService: AdminSaleService,
   ) {}

  @Get('transactions')
  @UseGuards(RequestVerify, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  async getAllTransactions( @RequestUser() user: UserDocument,@Query() query: AdminTransactionsDto) {
    return this.transactionsService.getAllTransactions(user._id,query);
  }

  @Post('sale/start')
   @UseGuards(RequestVerify, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  startSale(@RequestUser() user: UserDocument,@Body() dto: StartSaleDto) {
    return this.adminSaleService.startSale(user._id,dto);
  }

  @Post('sale/extend')
   @UseGuards(RequestVerify, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  extendSale(@RequestUser() user: UserDocument,@Body() dto: ExtendSaleDto) {
    return this.adminSaleService.extendSale(user._id,dto);
  }

  @Post('sale/end')
  @UseGuards(RequestVerify, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  endSale(@RequestUser() user: UserDocument,@Body() dto: EndSaleDto) {
    return this.adminSaleService.endSale(dto);
  }

   @Get('referral-overview')
    @UseGuards(RequestVerify, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  getReferralOverview(@RequestUser() user: UserDocument) {
    return this.adminSaleService.getReferralOverview();
  }

  @Get('token-distribution')
   @UseGuards(RequestVerify, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  getTokenDistribution(@RequestUser() user: UserDocument) {
    return this.adminSaleService.getTokenDistribution();
  }
  
  @Get('logs')
  @UseGuards(RequestVerify, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  getLogs(@RequestUser() user: UserDocument,@Query('limit') limit?: number, @Query('skip') skip?: number) {
    return this.adminService.getLogs({ limit, skip });
  }
}
