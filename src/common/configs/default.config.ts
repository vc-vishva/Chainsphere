import * as dotenv from 'dotenv';

/**
 * Get Environment Function
 * @returns Environment
 */
export const getEnvFile = (): string => `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: getEnvFile() });

/**
 * Environments config variables
 */
export default {
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  S3PATH: process.env.S3PATH,
  CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
  API_LOGIN_KEY: process.env.API_LOGIN_KEY,
  API_SECRET_KEY: process.env.API_SECRET_KEY,
};

/**
 * Description - Default values
 */
export const Defaults = {
  LOGS_ZIP_FILE: 'logs.zip',
  ERROR_LOG_PATH: 'logs/error.log',
  COMBINED_LOG_PATH: 'logs/combined.log',
  PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
  TOKEN_EXPIRY_TIME: 24,
  FORGOT_PASSWORD_SUBJECT: 'Reset Password Request',
  NEW_ADMIN_JOIN_COMMUNITY_SUBJECT: 'New Merchant Onboarded',
  REDIRECT_URL_PATH: 'http://localhost:5000/api/auth/reset-password/',
  PASSWORD_CHARS: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  SALT_ROUND: 10,
  RESET_TOKEN_EXPIRY: '10m',
  EMAIL_VERIFICATION_TOKEN_EXPIRY: '10m',
  RESET_PASSWORD_URL: `${process.env.FRONTEND_URL}/reset-password/`, //need to add frontend url that will call resetpassword.
  RESET_PASSWORD_URL_DONOR: `${process.env.FRONTEND_URL}/donor/auth/reset-password/`, //need to add frontend url that will call resetpassword.
  ADMIN_RESET_PASSWORD_URL: `${process.env.ADMIN_FRONTEND_URL}/auth/reset-password/`, //need to add frontend url that will call resetpassword.
  UPDATE_PASSWORD: 'Your Password Has Been Updated Successfully',
};
