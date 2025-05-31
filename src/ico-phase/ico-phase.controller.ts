import { Controller, Get } from '@nestjs/common';
import { IcoPhaseService } from './ico-phase.service';

@Controller('ico-phase')
export class IcoPhaseController {
  constructor(private readonly icoPhaseService: IcoPhaseService) {}

  
@Get('current-price')
  async getCurrentPrice(): Promise<object> {
    return this.icoPhaseService.findCurrentPrice();
  }

  @Get('phase-tracker')
  async getPhaseTracker(): Promise<object> {
    return this.icoPhaseService.trackCurrentPhase();
  }
}
