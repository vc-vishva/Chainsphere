import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class CoreBusinessInfo {
  @IsString({ message: 'Legal business name must be a string.' })
  @IsNotEmpty({ message: 'Legal business name is required.' })
  legalBusinessName: string;

  @IsString({ message: 'DBA name must be a string.' })
  @IsNotEmpty({ message: 'DBA name is required.' })
  businessNameDBA: string;

  @IsString({ message: 'Business address must be a string.' })
  @IsNotEmpty({ message: 'Business address is required.' })
  businessAddress: string;

  @IsString({ message: 'Business city must be a string.' })
  @IsNotEmpty({ message: 'Business city is required.' })
  businessCity: string;

  @IsString({ message: 'Business state must be a string.' })
  @IsNotEmpty({ message: 'Business state is required.' })
  businessState: string;

  @Matches(/^\d{5}$/, { message: 'Business ZIP code must be a 5-digit number.' })
  @IsNotEmpty({ message: 'Business ZIP code is required.' })
  businessZipcode: string;

  @IsString({ message: 'Billing address must be a string.' })
  @IsNotEmpty({ message: 'Billing address is required.' })
  billingAddress: string;

  @IsString({ message: 'Billing city must be a string.' })
  @IsNotEmpty({ message: 'Billing city is required.' })
  billingCity: string;

  @IsString({ message: 'Billing state must be a string.' })
  @IsNotEmpty({ message: 'Billing state is required.' })
  billingState: string;

  @Matches(/^\d{5}$/, { message: 'Billing ZIP code must be a 5-digit number.' })
  @IsNotEmpty({ message: 'Billing ZIP code is required.' })
  billingZipcode: string;

  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, {
    message: 'Enter a valid business website URL.',
  })
  @IsNotEmpty({ message: 'Business website is required.' })
  businessWebsite: string;

  @IsString({ message: 'Business registration state must be a string.' })
  @IsNotEmpty({ message: 'Business registration state is required.' })
  businessRegistrationState: string;

  // @IsNotEmpty({ message: 'EIN is required.' })
  @IsOptional()
  ein: string;

  @IsNumber({}, { message: 'Business start year must be a valid number.' })
  @IsNotEmpty({ message: 'Business start year is required.' })
  businessStartYear: number;

  @IsNumber({}, { message: 'Business start month must be a valid number between 1-12.' })
  @IsNotEmpty({ message: 'Business start month is required.' })
  businessStartMonth: number;
}

export class BankingInformation {
  @IsString({ message: 'Bank name must be a string.' })
  @IsNotEmpty({ message: 'Bank name is required.' })
  bankName: string;

  @Matches(/^\d{9}$/, { message: 'Routing number must be a 9-digit number.' })
  @IsNotEmpty({ message: 'Routing number is required.' })
  routingNumber: string;

  @Matches(/^\d+$/, { message: 'Account number must be a valid number.' })
  @IsNotEmpty({ message: 'Account number is required.' })
  accountNumber: string;
}

export class BusinessPrincipals {
  @IsString({ message: 'First name must be a string.' })
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @IsString({ message: 'Last name must be a string.' })
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date of birth must be in YYYY-MM-DD format.' })
  @IsNotEmpty({ message: 'Date of birth is required.' })
  dateOfBirth: string;

  @IsString({ message: 'Driver license number must be a string.' })
  @IsNotEmpty({ message: 'Driver license number is required.' })
  driverLicenseNumber: string;

  @IsString({ message: 'Driver license issuing state must be a string.' })
  @IsNotEmpty({ message: 'Driver license issuing state is required.' })
  driverLicenseIssuingState: string;

  @IsString({ message: 'Home address must be a string.' })
  @IsNotEmpty({ message: 'Home address is required.' })
  homeAddress: string;

  @IsString({ message: 'City must be a string.' })
  @IsNotEmpty({ message: 'City is required.' })
  city: string;

  @IsString({ message: 'State must be a string.' })
  @IsNotEmpty({ message: 'State is required.' })
  state: string;

  @Matches(/^\d{5}$/, { message: 'ZIP code must be a 5-digit number.' })
  @IsNotEmpty({ message: 'ZIP code is required.' })
  zip: string;

  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Enter a valid email address.' })
  @IsNotEmpty({ message: 'Owner email is required.' })
  ownerEmail: string;
}

export class MerchantOnboardingDto {
  @IsObject({ message: 'Core business info must be an object.' })
  @Type(() => CoreBusinessInfo)
  coreBusinessInfo: CoreBusinessInfo;

  @IsObject({ message: 'Banking information must be an object.' })
  @Type(() => BankingInformation)
  bankingInformation: BankingInformation;

  @IsOptional()
  @Transform(({ value }): BusinessPrincipals[] => {
    return typeof value === 'string' && value !== '' ? JSON.parse(value) : value;
  })
  @IsArray({ message: 'Business principals must be an array of objects.' })
  businessPrincipals: BusinessPrincipals[];
}
