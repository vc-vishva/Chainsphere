import { Controller, Get, UseGuards } from '@nestjs/common';
import { IcoPhaseService } from './ico-phase.service';
import { RequestVerify } from 'src/common/guards/request-verify.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { UserDocument } from 'src/user/schemas/user.schema';

@Controller('ico-phase')
export class IcoPhaseController {
  constructor(private readonly icoPhaseService: IcoPhaseService) {}

  
@Get('current-price')
  @UseGuards(RequestVerify, RoleGuard)
  async getCurrentPrice(@RequestUser() user: UserDocument,): Promise<object> {
    return this.icoPhaseService.findCurrentPrice();
  }

  @Get('phase-tracker')
  async getPhaseTracker(@RequestUser() user: UserDocument,): Promise<object> {
    return this.icoPhaseService.trackCurrentPhase();
  }
}
