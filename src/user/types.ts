import { FilterQuery, Types } from 'mongoose';
import { CommonResponse } from '../common/types';
import { UserDocument } from './schemas/user.schema';

export interface UserDetailResponseData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export type UserDetailModel = Promise<CommonResponse<UserDetailResponseData>>;

export interface LoginData {
  _id: Types.ObjectId;
  email: string;
  lastName?: string;
  firstName?: string;
  merchantName?: string;
  accessToken: string;
  phoneNumber?: string;
  appliedForMerchantApp?: boolean;
  isProfileLive?: boolean;
  availableForCelebration?: boolean;
}

export enum RoleEnum {
  ADMIN = 'Admin',
  USER = 'User',
}
export interface UserInformation extends Partial<UserDocument> {
  notifications?: NotificationsEntity[] | null;
}

export interface NotificationsEntity {
  _id: string;
  status: boolean;
  title: string;
  description: string;
}


interface Merchant {
  id: string;
}

interface CheckFormFillResponseType {
  _id: Types.ObjectId;
  isFormFilled: string[] | [];
}

export interface MerchantResponse {
  _id: Types.ObjectId;
  merchantName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

export interface MerchantStats {
  totalMerchantCount: number;
  totalDonationCount: number;
  totalDonationAmount: number;
  merchants: MerchantDetails[];
}

interface MerchantDetails {
  merchantName: string;
  email: string;
  totalDonations: number;
  totalDonationAmount: number;
}

interface ZipCodeDetails {
  postal_code: string;
  country_code: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
  city_en: string;
  state_en: string;
  state_code: string;
  province: string;
  province_code: string;
}

export interface ZipCodeResponse {
  query: {
    codes: string[];
    country: string;
  };
  results: Record<string, ZipCodeDetails[]>;
}

export type LoginResponse = Promise<CommonResponse<LoginData>>;
export type CheckFormFillResponse = Promise<CommonResponse<CheckFormFillResponseType>>;

export type UserQueryObject = Partial<FilterQuery<UserDocument>>;
export type GetUserInformation = Promise<CommonResponse<UserInformation>>;
export type GetMerchantInformation = Promise<CommonResponse<MerchantResponse>>;
