import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiLoginKey } from '../common/decorators/api-login-key.decorator';
import { OnlyMessageResponse } from '../common/types';
import { LoginResponse } from '../user/types';
import { AuthService } from './auth.service';
import { AdminForgotPasswordDto } from './dtos/admin-forgot-password.dto';
import { CreateAdminDto } from './dtos/create.admin.dto';
import { CreateUserDto } from './dtos/create.user.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { UserLoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //***************************************************************Admin*****************************************************/
  /**
   * Description - Admin signup API
   * @param createUserDto CreateUserDto
   * @returns Common success | error response
   */
  @Post('signup')
  async signup(@Body() createAdminDto: CreateAdminDto, @ApiLoginKey() validApiKey: boolean): OnlyMessageResponse {
    return this.authService.signup(createAdminDto, validApiKey);
  }

  /**
   * Description - Admin login API
   * @param userLoginDto UserLoginDto
   * @returns Admin Details with access token
   */
  @Post('login')
  async login(@Body() loginDto: UserLoginDto): LoginResponse {
    return this.authService.login(loginDto);
  }

  /**
   * Description - Admin Forgot password API
   * @param forgotPasswordDto SendEmailDto
   * @returns Common success | error response
   */
  @Post('admin/forgot-password')
  async adminForgotPassword(@Body() adminForgotPasswordDto: AdminForgotPasswordDto): OnlyMessageResponse {
    return this.authService.adminForgotPassword(adminForgotPasswordDto);
  }

  //***************************************************************user*****************************************************/

  /**
   * Description - User signup API
   * @param createUserDto CreateUserDto
   * @returns Common success | error response
   */
  @Post('user/signup')
  async userSignup(@Body() createUserDto: CreateUserDto): OnlyMessageResponse {
    return this.authService.userSignup(createUserDto);
  }


  /**
   * Description - User login API
   * @param userLoginDto UserLoginDto
   * @returns User Details with access token
   */
  @Post('user/login')
  async userLogin(@Body() loginDto: UserLoginDto): LoginResponse {
    return this.authService.userLogin(loginDto);
  }

  /**
   * Description - Forgot password API
   * @param forgotPasswordDto SendEmailDto
   * @returns Common success | error response
   */
  @Post('forgot-password')
  async userForgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): OnlyMessageResponse {
    return this.authService.userForgotPassword(forgotPasswordDto);
  }

  //***************************************************************common*****************************************************/



  /**
   * Description - Reset password API
   * @param resetPasswordDto ResetPasswordDto
   * @returns Common success | error response
   */
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): OnlyMessageResponse {
    return this.authService.resetPassword(resetPasswordDto);
  }

}
