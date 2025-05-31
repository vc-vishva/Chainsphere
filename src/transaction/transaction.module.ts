import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrder, PurchaseOrderSchema } from 'src/token-purchase/schemas/token-purchase.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema },
    { name: PurchaseOrder.name, schema: PurchaseOrderSchema }
  ])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports:[TransactionService]
})
export class TransactionModule {}
