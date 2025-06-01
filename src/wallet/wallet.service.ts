import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { WithdrawDto } from './dtos/withdraw.dto';
import { WalletLog, WalletLogDocument } from './schemas/wallet-log.schema';
import { errorMessages, successMessages } from 'src/common/configs/messages.config';
import { ResponseHandler } from 'src/utils/response-handler';

@Injectable()
export class WalletService {
    constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(WalletLog.name) private walletLogModel: Model<WalletLogDocument>,
  ) {}


async connectWallet(dto: CreateWalletDto): Promise<object> {
  const existing = await this.walletModel.findOne({
    userId: dto.userId,
    address: dto.address.toLowerCase(),
  });

  if (existing) {
    throw new ConflictException(`Wallet ${errorMessages.ALREADY_AVAILABLE}`);
  }

  const wallet = await this.walletModel.create({
    userId: dto.userId,
    address: dto.address.toLowerCase(),
  });

  return ResponseHandler.success(
    { wallet },
    `Wallet ${successMessages.SUCCESSFULLY_CREATED}`,
    HttpStatus.OK,
  );
}


async getMockBalance(userId: string): Promise<object> {
  const mockBalance = {
    userId,
    cspBalance: 5000,       // mock CSP tokens
    investmentBalance: 12000, // mock USD or equivalent
  };

  return ResponseHandler.success(
    mockBalance,
    successMessages.MOCK_BALANCE_RETRIEVED,
    HttpStatus.OK,
  );
}


async withdraw(dto: WithdrawDto): Promise<object> {
  const wallet = await this.walletModel.findOne({ userId: dto.userId });

  if (!wallet) {
    throw new BadRequestException('Wallet not found');
  }

  if (wallet.investmentBalance < dto.amount) {
    throw new BadRequestException('Insufficient investment balance');
  }

  wallet.investmentBalance -= dto.amount;
  await wallet.save();

  return ResponseHandler.success(
    { remainingBalance: wallet.investmentBalance },
    successMessages.WITHDRAWAL_SUCCESS,
    HttpStatus.OK,
  );
}


async getWalletLogs(userId: string): Promise<object> {
  const logs = await this.walletLogModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  if (!logs.length) {
    throw new NotFoundException('No wallet logs found for this user');
  }

  return ResponseHandler.success(
    { logs },
   `wallet  ${successMessages.SUCCESSFULLY_FETCHED}`,
    HttpStatus.OK,
  );
}
}
