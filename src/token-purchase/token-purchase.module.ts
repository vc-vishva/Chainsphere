import { Module } from '@nestjs/common';
import { TokenPurchaseService } from './token-purchase.service';
import { TokenPurchaseController } from './token-purchase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalePhase, SalePhaseSchema } from 'src/ico-phase/schemas/SalePhase.schema';
import { PurchaseOrder, PurchaseOrderSchema } from './schemas/token-purchase.schema';
import { Referral, ReferralSchema } from 'src/referral/schemas/referral.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: SalePhase.name, schema: SalePhaseSchema },
    { name: PurchaseOrder.name, schema: PurchaseOrderSchema },
    { name: Referral.name, schema: ReferralSchema },
  ])],
  controllers: [TokenPurchaseController],
  providers: [TokenPurchaseService],
})
export class TokenPurchaseModule {}
