import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { WithdrawDto } from './dtos/withdraw.dto';
import { RequestVerify } from 'src/common/guards/request-verify.guard';

@UseGuards(RequestVerify)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

   @Post('connect')
  async connectWallet(@Body() dto: CreateWalletDto) {
    return this.walletService.connectWallet(dto);
  }

   @Get('balance')
  async getMockBalance(@Query('userId') userId: string) {
    return this.walletService.getMockBalance(userId);
  }

  @Post('withdraw')
  async withdraw(@Body() dto: WithdrawDto) {
    return this.walletService.withdraw(dto);
  }

   @Get('logs')
  async getWalletLogs(@Query('userId') userId: string) {
    return this.walletService.getWalletLogs(userId);
  }
}
