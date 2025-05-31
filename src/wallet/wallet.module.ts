import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { WalletLog, WalletLogSchema } from './schemas/wallet-log.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema },
    { name: WalletLog.name, schema: WalletLogSchema }
    ])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
