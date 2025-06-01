import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenPurchaseService } from './token-purchase.service';
import { PurchaseDto } from './dtos/purchase.dto';
import { RequestVerify } from 'src/common/guards/request-verify.guard';

@UseGuards(RequestVerify)
@Controller('token-purchase')
export class TokenPurchaseController {
  constructor(private readonly tokenPurchaseService: TokenPurchaseService) {}

  @Post()
  async purchaseTokens(@Body() purchaseDto: PurchaseDto): Promise<object> {
    if (!['BNB', 'USDT'].includes(purchaseDto.currency.toUpperCase())) {
      throw new BadRequestException('Unsupported currency. Use BNB or USDT.');
    }
    return this.tokenPurchaseService.purchaseToken(purchaseDto);
  }
}
