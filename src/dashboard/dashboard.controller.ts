import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { promises } from 'dns';
import { UserService } from 'src/user/user.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { RequestVerify } from 'src/common/guards/request-verify.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { RoleEnum } from 'src/user/types';
import { UserDocument } from 'src/user/schemas/user.schema';
import { RequestUser } from 'src/common/decorators/request-user.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService,private readonly userService: UserService, ) {}

  @Get('stats')
    @UseGuards(RequestVerify, RoleGuard)
    @Roles(RoleEnum.ADMIN,RoleEnum.USER)
  async getStats(@RequestUser() user: UserDocument,):Promise<object> {
    return this.userService.getStats();
  }
}
