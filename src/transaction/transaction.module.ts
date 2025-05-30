import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transactions, TransactionsSchema } from './schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Transactions.name, schema: TransactionsSchema }])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
