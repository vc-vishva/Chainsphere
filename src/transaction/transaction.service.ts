import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { UserTransactionsDto } from 'src/user/dtos/user-transactions.dto';
import { PurchaseOrder, PurchaseOrderDocument } from 'src/token-purchase/schemas/token-purchase.schema';
import { AdminTransactionsDto } from 'src/admin/dtos/admin-trans';
import { successMessages } from 'src/common/configs/messages.config';
import { ResponseHandler } from 'src/utils/response-handler';

@Injectable()
export class TransactionService {

constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
   @InjectModel(PurchaseOrder.name) private readonly purchaseOrderModel: Model<PurchaseOrderDocument>) {}


async getUserTransactions(userId: string, query: UserTransactionsDto): Promise<object> {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    this.purchaseOrderModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec(),
    this.purchaseOrderModel.countDocuments({ userId }),
  ]);

  const result = {
    data: transactions,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };

  return ResponseHandler.success(
    result,
     `User transaction ${successMessages.SUCCESSFULLY_FETCHED}`,
    HttpStatus.OK
  );
}


 async getAllTransactions(
  userId: Types.ObjectId,
  query: AdminTransactionsDto,
): Promise<object> {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (query.userId) filter.userId = query.userId;
  if (query.status) filter.status = query.status;

  const [transactions, total] = await Promise.all([
    this.purchaseOrderModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec(),
    this.purchaseOrderModel.countDocuments(filter),
  ]);

  const responseData = {
    data: transactions,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  }

   return ResponseHandler.success(
    responseData,
    successMessages.SUCCESSFULLY_FETCHED,
    HttpStatus.OK,
  );
    
}
}