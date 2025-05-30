import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { Defaults } from '../common/configs/default.config';
import { errorMessages, successMessages } from '../common/configs/messages.config';
import { CommonMailService } from '../common/notification/mail.service';
import {  EmailTemplatePath, OnlyMessageResponse } from '../common/types';
import { ResponseHandler } from '../utils/response-handler';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  CheckFormFillResponse,
  GetUserInformation,
  MerchantStats,
  UserInformation,
  UserQueryObject,
  ZipCodeResponse,
} from './types';
import { Model, Types, UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { CreateAdminDto } from 'src/auth/dtos/create.admin.dto';
import { CreateUserDto } from 'src/auth/dtos/create.user.dto';

/**
 * Description - User service
 */
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly commonMailService: CommonMailService,
    private configService: ConfigService,
  ) {}

  /**
   * Description - Create User common function
   * @param createUserDto CreateUserDto
   * @returns User
   */
  async createUser(userData: Partial<CreateUserDto>): Promise<Partial<UserDocument>> {
    const userProfile = {
      ...userData,
      streetAddress: userData?.streetAddress || '',
      city: userData?.city || '',
      state: userData?.state || '',
      country: userData?.country || '',
      profilePicture: userData?.profilePicture || '',
      zipCode: userData?.zipCode || '',
      phoneNumber: userData?.phoneNumber || '',
    };
    return this.userModel.create(userProfile);
  }

  /**
   * Description - Create Admin common function
   * @param createAdminDto CreateAdminDto
   * @returns Admin
   */
  async createAdmin(userData: Partial<CreateAdminDto>): Promise<Partial<UserDocument>> {
    const userProfile = {
      ...userData,
      streetAddress: '',
      city: '',
      state: '',
      country: '',
      profilePicture: '',
      zipCode: '',
    };
    const admin = await this.userModel.create(userProfile);
    if (admin) {
      const userDonationPageUrl = `${Defaults.USER_DONATION_PAGE_URL}${admin._id.toString()}`;
      await admin.updateOne({ userDonationPageUrl });
    }
    return admin;
  }

 

  /**
   * Description - Get user common function
   * @param query UserQueryObject
   * @returns User
   */
  async getUserAndUpdate(query: UserQueryObject, update: object = {}): Promise<UserDocument | null> {
  return this.userModel.findOneAndUpdate(query, update, { new: true }).exec();
}


  /**
   * Description - Get user common function
   * @param query UserQueryObject
   * @returns User
   */
  async getUser(query: UserQueryObject, shouldGetPassword = false): Promise<UserDocument | null> {
  const queryBuilder = this.userModel.findOne(query);
  return shouldGetPassword ? queryBuilder.select('+password') : queryBuilder.exec();
}



  /**
   * Description - Change Password
   * @param user
   * @param changePasswordDto
   * @returns Common Response
   */
  async changePassword(userId: Types.ObjectId, changePasswordDto: ChangePasswordDto): OnlyMessageResponse {
    const userData = await this.userModel.findById(userId).select('+password');
    if (!userData) throw new NotFoundException(errorMessages.USER_NOT_FOUND);

    const checkPassword = await bcrypt.compare(changePasswordDto.password, userData.password);
    if (!checkPassword) throw new BadRequestException(errorMessages.INCORRECT_PASSWORD);

    if (changePasswordDto.password === changePasswordDto.newPassword) {
      throw new NotAcceptableException(errorMessages.PASSWORD_SAME);
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

    await userData.updateOne({ password: hashedPassword });
    await this.commonMailService
      .sendEmailWithTemplate(
        {
          name: `${userData.firstName} ${userData.lastName}`,
          donorProfileUrl: `${this.configService.get<string>('FRONTEND_URL')}/donor/profile`,
        },
        EmailTemplatePath.PASSWORD_UPDATE_NOTIFICATION,
        {},
        {
          to: userData.email,
          subject: Defaults.UPDATE_PASSWORD,
        },
      )
      .then(() => {
        return true;
      })
      .catch(() => {
        throw new InternalServerErrorException(errorMessages.SENT_EMAIL_FAILED);
      });

    return ResponseHandler.success({}, successMessages.PASSWORD_RESET, HttpStatus.OK);
  }


   async getUserJson(query: UserQueryObject): Promise<UserDocument | null> {
    return this.userModel.findOne(query);
  }

 
  /**
   * Description - update user common function
   * @param filterQuery UserQueryObject
   * @param updateQuery UpdateUserQuery
   * @returns UpdateWriteOpResult
   */
  async updateUser(
    filterQuery: UserQueryObject,
    updateQuery: Partial<UpdateQuery<UserDocument>>,
  ): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne(filterQuery, updateQuery, { new: true });
  }

}
