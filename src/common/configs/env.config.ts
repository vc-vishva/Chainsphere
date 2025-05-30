import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const envConfig = {
  bucket: process.env.S3_BUCKET_NAME,
  region: process.env.AWS_REGION,
  accessKey: process.env.AWS_ACCESS_KEY,
  secretKey: process.env.AWS_SECRET_KEY,
  s3Path: process.env.S3PATH,
  cryptoSecret: process.env.CRYPTO_SECRET_KEY,
  apiLoginKey: process.env.API_LOGIN_KEY,
  apiSecretKey: process.env.API_SECRET_KEY,
  filePath: process.env.FILEPATH,
};
