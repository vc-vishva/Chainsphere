import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalePhase, SalePhaseDocument } from './schemas/SalePhase.schema';
import { PxfObject } from 'tls';
import { successMessages } from 'src/common/configs/messages.config';
import { ResponseHandler } from 'src/utils/response-handler';

@Injectable()
export class IcoPhaseService {
    constructor(
    @InjectModel(SalePhase.name)
    private readonly salePhaseModel: Model<SalePhaseDocument>,
  ) {}

   async findCurrentPrice(): Promise<object> {
    const currentDate = new Date();

    const activePhase = await this.salePhaseModel.findOne(
      {
        isActive: true,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      },
      { _id: 1, name: 1, price: 1 },
    );

    if (!activePhase) {
      throw new InternalServerErrorException('No active sale phase found');
    }

    return ResponseHandler.success(
      activePhase,
      `ICO ${successMessages.SUCCESSFULLY_FETCHED}`,
      HttpStatus.OK,
    );
  }

  async trackCurrentPhase(): Promise<object> {
    const currentDate = new Date();

    const activePhase = await this.salePhaseModel.findOne(
      {
        isActive: true,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      },
      {
        _id: 1,
        name: 1,
        price: 1,
        tokenCap: 1,
        startDate: 1,
        endDate: 1,
      },
    );

    if (!activePhase) {
      throw new InternalServerErrorException('No active sale phase found');
    }

    return ResponseHandler.success(
      activePhase,
      `ICO phase ${successMessages.SUCCESSFULLY_FETCHED}`,
      HttpStatus.OK,
    );
  }
}
