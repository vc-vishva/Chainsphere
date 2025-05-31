import { Injectable } from '@nestjs/common';
import { Log, LogDocument } from './schemas/log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminService {
    constructor(@InjectModel(Log.name) private readonly logModel: Model<LogDocument>) {}


    async getLogs(pagination: { limit?: number; skip?: number }) {
    const { limit = 50, skip = 0 } = pagination;

    const logs = await this.logModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await this.logModel.countDocuments();

    return { total, logs };
  }

}
