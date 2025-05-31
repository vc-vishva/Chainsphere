import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TransactionModule } from 'src/transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SalePhase, SalePhaseSchema } from 'src/ico-phase/schemas/SalePhase.schema';
import { AdminSaleService } from './admin-sale.service';
import { Referral, ReferralSchema } from 'src/referral/schemas/referral.schema';
import { Log, LogSchema } from './schemas/log.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: SalePhase.name, schema: SalePhaseSchema },
    { name: Referral.name, schema: ReferralSchema },
    { name: Log.name, schema: LogSchema },
  ]),
    TransactionModule],
  controllers: [AdminController],
  providers: [AdminService, AdminSaleService],
})
export class AdminModule {}
