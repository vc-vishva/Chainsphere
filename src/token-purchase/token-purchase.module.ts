import { Module } from '@nestjs/common';
import { TokenPurchaseService } from './token-purchase.service';
import { TokenPurchaseController } from './token-purchase.controller';

@Module({
  controllers: [TokenPurchaseController],
  providers: [TokenPurchaseService],
})
export class TokenPurchaseModule {}
