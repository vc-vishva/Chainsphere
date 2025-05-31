import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { WithdrawDto } from './dtos/withdraw.dto';
import { WalletLog, WalletLogDocument } from './schemas/wallet-log.schema';

@Injectable()
export class WalletService {
    constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(WalletLog.name) private walletLogModel: Model<WalletLogDocument>,
  ) {}


async connectWallet(dto: CreateWalletDto) {
    const existing = await this.walletModel.findOne({
      userId: dto.userId,
      address: dto.address.toLowerCase(),
    });

    if (existing) {
      return {
        message: 'Wallet already connected',
        wallet: existing,
      };
    }

    const wallet = await this.walletModel.create({
      userId: dto.userId,
      address: dto.address.toLowerCase(),
    });

    return {
      message: 'Wallet connected successfully',
      wallet,
    };
  }

async getMockBalance(userId: string) {
    // Simulate fetching wallet balance for given userId
    return {
      userId,
      cspBalance: 5000, // mock CSP tokens
      investmentBalance: 12000, // mock USD or equivalent
    };
  }

async withdraw(dto: WithdrawDto) {
    const wallet = await this.walletModel.findOne({ userId: dto.userId });

    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }

    if (wallet.investmentBalance < dto.amount) {
      throw new BadRequestException('Insufficient investment balance');
    }

    wallet.investmentBalance -= dto.amount;
    await wallet.save();

    // In real app, also record transaction, notify user, etc.
    return {
      message: 'Withdrawal successful',
      remainingBalance: wallet.investmentBalance,
    };
  }

async getWalletLogs(userId: string) {
    const logs = await this.walletLogModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!logs.length) {
      throw new NotFoundException('No wallet logs found for this user');
    }

    return {
      message: 'Wallet logs fetched successfully',
      logs,
    };
  }
}
