import { Module } from '@nestjs/common';
import { IcoPhaseService } from './ico-phase.service';
import { IcoPhaseController } from './ico-phase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalePhase, SalePhaseSchema } from './schemas/SalePhase.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: SalePhase.name, schema: SalePhaseSchema }])],
  controllers: [IcoPhaseController],
  providers: [IcoPhaseService],
})
export class IcoPhaseModule {}
