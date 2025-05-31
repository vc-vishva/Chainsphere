import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UseGuards,
 
} from '@nestjs/common';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { RequestVerify } from '../common/guards/request-verify.guard';
import {  OnlyMessageResponse } from '../common/types';
import { ChangePasswordDto } from './dtos/change-password.dto';

import { User } from './schemas/user.schema';
import { CheckFormFillResponse,  } from './types';
import { UserService } from './user.service';
import { UserTransactionsDto } from './dtos/user-transactions.dto';
import { TransactionService } from 'src/transaction/transaction.service';

/**
 * Description - User Controller
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly transactionService: TransactionService) {}


  /**
   * Description - Change Password
   * @param user
   * @param changePasswordDto
   * @returns Common Response
   */
  @Put('change-password')
  @UseGuards(RequestVerify)
  async changePassword(@RequestUser() user: User, @Body() changePasswordDto: ChangePasswordDto): OnlyMessageResponse {
    return this.userService.changePassword(user._id, changePasswordDto);
  }

 @Get()
  async getUserTransactions(
    @Req() req,
    @Query() query: UserTransactionsDto,
  ) {
    const userId = req.user._id; // assuming user id stored here by auth middleware
    return this.transactionService.getUserTransactions(userId, query);
  }
}
