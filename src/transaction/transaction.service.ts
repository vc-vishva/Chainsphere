import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transactions } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {

     constructor(@InjectModel(Transactions.name) private readonly transactionModel: Model<Transactions>) {}
}
