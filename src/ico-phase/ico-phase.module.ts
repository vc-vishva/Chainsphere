import { Module } from '@nestjs/common';
import { IcoPhaseService } from './ico-phase.service';
import { IcoPhaseController } from './ico-phase.controller';

@Module({
  controllers: [IcoPhaseController],
  providers: [IcoPhaseService],
})
export class IcoPhaseModule {}
