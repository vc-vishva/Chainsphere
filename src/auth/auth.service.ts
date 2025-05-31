import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CommonService } from '../common/common.service';
import { Defaults } from '../common/configs/default.config';
import { errorMessages, successMessages } from '../common/configs/messages.config';
import { CommonMailService } from '../common/notification/mail.service';
import { EmailTemplatePath, OnlyMessageResponse } from '../common/types';
import { LoginResponse } from '../user/types';
import { UserService } from '../user/user.service';
import { ResponseHandler } from '../utils/response-handler';
import { CreateUserDto } from './dtos/create.user.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { UserLoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { EmailVerify, EmailVerifyDocument } from './schemas/email-verify.schema';
import { Lead, LeadDocument } from './schemas/email.schema';
import { ForgotPassword, ForgotPasswordDocument } from './schemas/forgot-password.schema';

/**
 * Description - Auth Service
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmailVerify.name)
    private readonly emailVerifyModel: Model<EmailVerify>,
    @InjectModel(ForgotPassword.name)
    private readonly resetPasswordTokenModel: Model<ForgotPassword>,
    @InjectModel(Lead.name) private readonly emailModel: Model<LeadDocument>,
    private jwtService: JwtService,
    private readonly userService: UserService,
    private commonService: CommonService,
    private commonMailService: CommonMailService,
    private configService: ConfigService,
  ) {}

  /**
   * Description - User signup service
   * @param createUserDto CreateUserDto
   * @returns Common success | error response
   */
  async userSignup(createUserDto: CreateUserDto): OnlyMessageResponse {
    const userWithEmail = await this.userService.getUserJson({ email: createUserDto.email, userType: 'User' });

    if (userWithEmail) {
      throw new ConflictException(errorMessages.USER_ALREADY_REGISTERED);
    }
    createUserDto['userType'] = 'User';
      const user = await this.userService.createUser(createUserDto);
      const emailVerificationToken = this.commonService.generateToken(12);
        await this.createEmailVerifyToken({
        userId: user._id,
        token: emailVerificationToken,
      });

    return ResponseHandler.success([], successMessages.USER_SIGNUP, HttpStatus.OK);
  }

  /**
   * Description - User login service
   * @param userLoginDto UserLoginDto
   * @returns User Details with access token
   */
  async userLogin(loginDto: UserLoginDto): LoginResponse {
    const user = await this.userService.getUser({ userType: 'User', email: loginDto.email }, true);
    if (!user) throw new NotFoundException(errorMessages.INCORRECT_DETAILS);

    const passwordCheck = await user.validatePassword(loginDto.password);
    if (!passwordCheck) {
      throw new UnauthorizedException(errorMessages.INCORRECT_DETAILS);
    }
    const payload = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const profilePictureUrl =
      user.profilePicture !== '' ? `${this.configService.get('PROFILE_PICTURE_URL')}${user.profilePicture}` : '';

    return ResponseHandler.success(
      {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: profilePictureUrl,
        accessToken,
      },
      successMessages.USER_LOGGED_IN,
      HttpStatus.OK,
    );
  }


  /**
   * Description - Forgot password service
   * @param forgotPasswordDto SendEmailDto
   * @returns Common success | error response
   */
  async userForgotPassword(forgotPasswordDto: ForgotPasswordDto): OnlyMessageResponse {
    const user = await this.userService.getUser({
      email: forgotPasswordDto.email,
      userType: 'User',
    });
    if (!user) throw new NotFoundException(errorMessages.USER_NOT_REGISTERED);

    if (!user.emailVerified) throw new BadRequestException(errorMessages.EMAIL_NOT_VERIFIED);
    const resetPasswordToken = this.commonService.generateToken(12);

    await this.createResetPasswordToken({
      userId: user._id,
      token: resetPasswordToken,
    });

    const redirectUrl = forgotPasswordDto.slug
      ? `${Defaults.RESET_PASSWORD_URL}${forgotPasswordDto.slug}?token=${resetPasswordToken}`
      : `${Defaults.RESET_PASSWORD_URL_DONOR.substring(0, Defaults.RESET_PASSWORD_URL_DONOR.length - 1)}?token=${resetPasswordToken}`;

    await this.commonMailService
      .sendEmailWithTemplate(
        {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          redirectUrl,
          donorProfileUrl: undefined,
        },
        EmailTemplatePath.FORGOT_PASSWORD,
        {},
        {
          to: user.email,
          subject: Defaults.FORGOT_PASSWORD_SUBJECT,
        },
      )
      .then(() => {
        return true;
      })
      .catch(() => {
        throw new InternalServerErrorException(errorMessages.SENT_EMAIL_FAILED);
      });

    return ResponseHandler.success([], successMessages.FORGOT_PASSWORD, HttpStatus.OK);
  }

  /**
   * Description - Reset password service
   * @param resetPasswordDto ResetPasswordDto
   * @returns Common success | error response
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): OnlyMessageResponse {
    const idToken = await this.getResetPasswordToken({
      token: resetPasswordDto.token,
    });
    if (!idToken) throw new NotFoundException(errorMessages.RESET_TOKEN_EXPIRED);

    await this.userService.updateUser(
      { _id: idToken.userId },
      {
        password: await this.commonService.hashPassword(resetPasswordDto.password),
      },
    );

    await this.resetPasswordTokenModel.deleteOne({
      token: resetPasswordDto.token,
    });

    return ResponseHandler.success([], successMessages.PASSWORD_RESET, HttpStatus.OK);
  }


  /**
   * Description - Create Email Verify Token common function
   * @param idTokenData Partial<ForgotPasswordDocument>
   * @returns Email Verify Token Document
   */
  async createEmailVerifyToken(idTokenData: Partial<EmailVerifyDocument>): Promise<EmailVerifyDocument> {
    return this.emailVerifyModel.create(idTokenData);
  }



  /**
   * Description - Create Reset Password Token common function
   * @param idTokenData Partial<ForgotPasswordDocument>
   * @returns Reset Password Token Document
   */
  async createResetPasswordToken(idTokenData: Partial<ForgotPasswordDocument>): Promise<ForgotPasswordDocument> {
    return this.resetPasswordTokenModel.create(idTokenData);
  }

  /**
   * Description - Get Reset Password Token common function
   * @param query
   * @returns Reset Password Token  document
   */
  async getResetPasswordToken(query: Partial<FilterQuery<ForgotPasswordDocument>>): Promise<ForgotPasswordDocument | null> {
    return this.resetPasswordTokenModel.findOne(query);
  }

}
