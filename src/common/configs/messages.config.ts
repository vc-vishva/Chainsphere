/**
 * Description - Constant Error Messages
 */
export const errorMessages = {
  UNEXPECTED_ERROR: 'Unexpected Error',
  USER_NOT_FOUND: 'User not found.',
  RESET_TOKEN_EXPIRED: 'Reset password token is expired.',
  INVALID_SUBJECT: 'Invalid subject type or subject not define, please add valid subject.',
  INCORRECT_PASSWORD: 'Invalid Password.',
  USER_ALREADY_REGISTERED:
    'Email is already registered. Please try login or use a different email to register new organization.',
  VERIFICATION_LINK_EXPIRED: 'Email verification link is either invalid or expired',
  INCORRECT_DETAILS: 'Invalid email or password',
  USER_NOT_REGISTERED: 'Email not found,please sign up first.',
  EMAIL_NOT_VERIFIED: 'Email not verified. Please verify your email before accessing your account',
  INVALID_TOKEN: 'Invalid token. Please provide a valid authentication token.',
  USER_UNAUTHORIZED: 'Your session has expired. Please log in again.',
  ALREADY_AVAILABLE: 'already available.',
  DONATION_ENTRY_NOT_ALLOWED: 'Maximum 20 entry allowed, Please delete some donations to add more.',
  UNAUTHORIZED_REQUEST: 'Unauthorized request.',
  PERMISSION_DENIED: 'You do not have permission to access this resource.',
  NOT_FOUND: 'not found.',
  NOT_UPDATE: 'not update.',
  TRANSACTION_FAILED: 'Sorry! Unable to process the transaction',
  PASSWORD_SAME: 'old password and new password are same',
  PAYMENT_FAIL: 'Payment failed! Please try again.',
  WRONG_ACCOUNT_DETAILS: 'Payment failed! Please enter valid account details',
  WRONG_CARD_DETAILS: 'Payment failed! Please enter valid card details',
  UNABLE_TO_TRANSACTION: 'Unable to process the transaction',
  INCOMPLETE_PROCESS: 'Please complete the merchant application first.',
  FAILED_TO_PROCESS: 'Failed to process the application.',
  CONFIGURE_CREDENTIALS: 'Please complete the configuration by navigating to the merchant credentials tab',
  INVALID_CITY: 'Please select a valid city.',
  SELECT_CITY: 'Please choose a valid city within the specified state.',
  SELECT_CITY_STATE: 'Please choose a valid city and state.',
  SELECT_STATE: 'Please choose a valid state.',
  GUEST_USER_RECURRING: 'Please log in first and then apply for recurring payment.',
  SENT_EMAIL_FAILED: 'Something went wrong while sent email',
  MERCHANT_NOT_VERIFY: 'is currently not accepting donations.',
  REFUND_ALREADY_DONE: 'Refund has already been processed.',
  VOID_ALREADY_DONE: 'Void has already been processed.',
  REFUND_NOT_APPLIED: 'Refund is not available for ACH payment.',
  ENTER_VALID_STARTDATE: 'please enter valid start date.',
  ENTER_VALID_ENDDATE: 'please enter valid end date.',
  NOT_VALID_PERCENTAGE: 'platform fees percentage must be between 0.1 and 4.',
  NOT_VALID_FIXVALUE: 'platform fees fixValue must be between 0 and 10.',
  INVALID_URL: 'This is not valid youtube url.',
  ONLY_ONE_DEFAULT: 'Please select only one default value.',
  ONE_PAYMENT_OPTION_REQUIRED: 'Please select either a one-time payment or a recurring payment option to proceed.',
  RECURRING_DONATION_DONE: 'A recurring payment has already been made for today.',
  CREATE_LEAD: 'Email is already saved. Please try to join us using different email.',
  PAYMENT_TYPE_NOT_SUPPORTED: 'This payment type does not support recurring payments.',
  APPLICATION_ALREADY_SUBMITTED: 'This application already submitted.',
  PAYMENT_CONSENT_REQUIRED: 'Please accept the payment consent before applying for recurring payment.',
};

/**
 * Description - Constant Success Messages
 */
export const successMessages = {
  PASSWORD_RESET: 'Password changed successfully.',
  USER_SIGNUP: 'Register successfully.',
  USER_LOGGED_IN: 'User logged in successfully.',
  ADMIN_LOGGED_IN: 'Admin logged in successfully.',
  EMAIL_VERIFIED: 'Email verified successfully. You can now access your account.',
  FORGOT_PASSWORD: 'Please check your email for the password reset link.',
  SUCCESSFULLY_CREATED: 'created successfully.',
  SUCCESSFULLY_DELETED: 'deleted successfully.',
  SUCCESSFULLY_UPDATED: 'updated successfully.',
  SUCCESSFULLY_PAUSED: 'paused successfully.',
  SUCCESSFULLY_CANCELED: 'canceled successfully.',
  SUCCESSFULLY_SAVED: 'saved successfully.',
  SUCCESSFULLY_FETCHED: 'details fetched successFully.',
  SUCCESSFULLY_GET_LIST: 'list get successfully',
  SUCCESSFULLY_DONE: 'done successfully.',
  SUCCESSFULLY_ADDED: 'added successfully.',
  SUCCESSFULLY_FAILED: 'failed.',
  SUCCESSFULLY_EXPORTED: 'data export successFully.',
  SUCCESSFULLY_APPLIED_MERCHANT_REQUEST:
    'Requested merchant application! Please check your registered email to complete onboarding process.',
  SUCCESSFULLY_APPLIED_MERCHANT_REQUEST_GETTRX:
    'Your application for gettrx was successful. Please complete the onboarding process',
  STORED_SUCCESSFULLY: 'Information stored successfully.',
  RESCHEDULED_SUCCESSFULLY: 'rescheduled successfully.',
  SEND_DONAION_ZIP_FILE: 'Please check your email. We will send the zip file for the donation records to your email',
};

/**
 * Description - Constant Validation Messages
 */
export const validationMessages = {
  FIRST_NAME_IS_ALPHA: 'Invalid input. Special characters or numbers are not allowed in the first name',
  NAME_IS_ALPHA: 'Invalid input. Special characters or numbers are not allowed in the name',
  LAST_NAME_IS_ALPHA: 'Invalid input. Special characters or numbers are not allowed in the last name',
  IS_NOT_ALPHA: 'Invalid input. Special characters or numbers are not allowed in the ##',
  PASSWORD_IS_VALID:
    'Password should contain minimum 8 characters 1 small letter or capital letter , 1 number and 1 special characters',
  DATE_OF_BIRTH_ISO_STRING: 'The date of birth should be represented in the ISO 8601 standard format',
  DONATION_NOT_EMPTY: 'The donation amount should not be empty, and you can only add up to eight donations.',
  AMOUNT_IS_NUMBER: 'Amount must be a valid number.',
  NOT_EMPTY: 'should not be empty.',
  INVALID_STRING: 'should be in string.',
};

/**
 * Description - Common function for required field validation message
 * @param fieldName string
 * @returns Validation message
 */
export const fieldRequired = (fieldName: string): string => {
  return `Invalid input, The field ${fieldName} is required.`;
};

/**
 * Description - Common function for invalid field validation message
 * @param fieldName string
 * @returns Validation message
 */
export const fieldInvalid = (fieldName: string): string => {
  return `${fieldName} is invalid`;
};

/**
 * Description - Common function for minimum length field validation
 * @param fieldName string
 * @param length number
 * @returns Validation message
 */
export const minimumLength = (fieldName: string, length: number): string => {
  return `${fieldName} should have at least ${length} characters`;
};

/**
 * Description - Common function for maximum length field validation
 * @param fieldName string
 * @param length number
 * @returns Validation message
 */
export const maximumLength = (fieldName: string, length: number): string => {
  return `${fieldName} should have maximum ${length} characters`;
};
