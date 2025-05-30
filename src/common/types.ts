export interface CommonResponse<T = any> {
  status: boolean;
  statusCode: number;
  message: string | string[];
  data: T | [];
  error: T | [];
}

export type OnlyMessageResponse = Promise<CommonResponse>;

export interface CommonMailResponse {
  accepted?: string[];
  rejected?: [];
  messageTime?: number;
  messageSize?: number;
  response?: string;
}

interface Attachment {
  filename: string;
  path?: Buffer | string;
  content?: Buffer | string;
  contentType?: string;
}

export interface EmailData {
  attachments?: Attachment[];
  text?: string;
  email?: string;
  amount?: number;
  password?: string;
  name?: string;
  subject?: string;
  template?: Buffer | string;
  from?: string;
  to?: string;
  html?: string | Buffer;
  redirectUrl?: string;
  logoUrl?: string;
  causeName?: string;
  organizationName?: string;
  organizationAddress?: string;
  organizationEmail?: string;
  organizationPhone?: string;
  donationDate?: string;
  donorName?: string;
  donorEmail?: string;
  donorAddress?: string;
  donationAmount?: string;
  paymentMethod?: string;
  transactionId?: string;
  taxDeductibleInformation?: string;
  additionalCharges?: string;
  zipFileLink?: string;
  date?: string;
  donationType?: string;
  transactionFees?: string;
  donorProfileUrl?: string;
  userEmail?: string;
  description?: string;
  attachmentUrl?: string;
  category?: string;
  ticketId?: string;
}

export interface JwtTokenPayload {
  _id: string;
  email: string;
  userType: string;
}

export interface RequestWithPayload extends Request {
  user: JwtTokenPayload;
}

/**
 * @ignore
 */
export interface CommonFile {
  bannerLogo?: [FileType];
  banner?: [FileType];
  donationPortrait?: [FileType];
  causeImage?: [FileType];
  profilePicture?: [FileType];
  attachments?: [FileType];
}

/**
 * @ignore
 */
export interface FileType {
  fieldname: string;
  filename?: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null;
  contentEncoding: null;
  storageClass: string;
  serverSideEncryption: null;
  metadata: [object];
  location: string;
  etag: string;
  versionId: undefined;
}

/*
 **
 * @ignore
 */
export enum SortFields {
  ASE = 'asc',
  DEC = 'desc',
}

/**
 * @ignore
 */
export enum SortKey {
  FIRSTNAME = 'firstName',
  LASTNAME = 'lastName',
  EMAIL = 'email',
  ISACTIVE = 'isActive',
  ISDELETED = 'isDeleted',
  CREATEDAT = 'createdAt',
  CAUSETITLE = 'causeTitle',
  DONORNAME = 'donorName',
  AMOUNT = 'amount',
  CAUSESTATUS = 'causeStatus',
  DONATIONSTATUS = 'donationStatus',
  FULLNAME = 'fullName',
  TOTALDONATIONAMOUNT = 'totalDonationAmount',
  LASTDONATIONDATE = 'lastDonationDate',
}

export interface FilterData {
  isDeleted?: boolean;
  isActive?: boolean;
  causeStatus?: string;
  donationStatus?: string;
  donationType?: string;
  frequency?: string;
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

export interface ReceiptData {
  logoUrl: string;
  organizationName: string;
  organizationAddress: string;
  organizationEmail: string;
  organizationPhone: string;
  donationDate: string;
  donorName: string;
  donorEmail: string;
  donorAddress: string;
  donationAmount: string;
  paymentMethod: string;
  transactionId: string;
  taxDeductibleInformation: string;
  additionalCharges: string;
  email?: string;
  subject?: string;
}

export interface CommonMailResponse {
  accepted?: string[];
  rejected?: [];
  messageTime?: number;
  messageSize?: number;
  response?: string;
}

export enum EmailTemplatePath {
  VERIFY_USER = 'verify-user.ejs',
  FORGOT_PASSWORD = 'forgot-password.ejs',
  REMAINDER_PAYMENT_DEDUCTION = 'donation-remainder.ejs',
  PAYMENT_SUCCESSFULLY_PROCESSED = 'donation-success.ejs',
  DONATION_ZIP = 'donation-zip.ejs',
  RECEIPT_PDF = 'receipt.ejs',
  ONETIME_DONATION_RECEIPT = 'donation.ejs',
  PASSWORD_UPDATE_NOTIFICATION = 'password-update.ejs',
  USER_REFUND_NOTIFICATION = 'refund.ejs',
  USER_VOID_NOTIFICATION = 'void.ejs',
  ADMIN_REFUND_NOTIFICATION = 'admin-refund-trans.ejs',
  ADMIN_VOID_NOTIFICATION = 'admin-void-trans.ejs',
  CELEBRATION = 'admin-celebration.ejs',
  SEND_USER_PASSWORD = 'send-password.ejs',
  MERCHANT_DONATION_SUCCESS = 'create-merchant-donation.ejs',
  ADMIN_JOIN_COMMUNITY = 'admin-sign-up.ejs',
  ADMIN_HELP_SUPPORT_TICKET = 'admin-support.ejs',
  USER_HELP_SUPPORT_TICKET = 'user-support.ejs',
}
export interface ErrorDetail {
  msg?: string;
  message?: string;
  param?: string;
  location?: string;
}

export interface ErrorResponse {
  message?: string;
  code?: number;
  success?: boolean;
  errors?: ErrorDetail[];
}

export interface CustomAxiosErrorResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: any[];
  error: any[];
}

export interface ApiResStatus {
  status?: string;
  responseCode?: string;
  responseReason?: string;
  responseDesc?: string;
  errors?: any[];
}
