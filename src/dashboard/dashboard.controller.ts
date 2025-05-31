import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { promises } from 'dns';
import { UserService } from 'src/user/user.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService,private readonly userService: UserService, ) {}

  @Get('stats')
  async getStats():Promise<object> {
    return this.userService.getStats();
  }
}
