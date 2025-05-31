import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {

     constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>) {}
}
