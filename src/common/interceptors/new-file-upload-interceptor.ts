import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import multer, { diskStorage } from 'multer';
import * as path from 'path';

import { extname } from 'path';

const storage = diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case 'bannerLogo':
        cb(null, 'public/uploads/bannerLogos');
        break;
      case 'donationPortrait':
        cb(null, 'public/uploads/donationPortraits');
        break;
      case 'banner':
        cb(null, 'public/uploads/banners');
        break;
      case 'causeImage':
        cb(null, 'public/uploads/causeImages');
        break;
      case 'profilePicture':
        cb(null, 'public/uploads/profilePictures');
        break;
      case 'attachments':
        cb(null, 'public/uploads/attachments');
        break;
      default:
        cb(new Error('Invalid fieldname'), '');
        break;
    }
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const fileExtension = extname(file.originalname);

    switch (file.fieldname) {
      case 'bannerLogo':
        cb(null, `bannerLogo${timestamp}${Math.floor(Math.random() * (90 + 10))}-${timestamp}${fileExtension}`);
        break;
      case 'donationPortrait':
        cb(null, `donationPortrait${timestamp}${Math.floor(Math.random() * (90 + 10))}-${timestamp}${fileExtension}`);
        break;
      case 'banner':
        cb(null, `banner${timestamp}${Math.floor(Math.random() * (90 + 10))}-${timestamp}${fileExtension}`);
        break;
      case 'causeImage':
        cb(null, `causeImage${timestamp}${Math.floor(Math.random() * (90 + 10))}-${timestamp}${fileExtension}`);
        break;
      case 'profilePicture':
        cb(null, `profilePicture${timestamp}${Math.floor(Math.random() * (90 + 10))}-${timestamp}${fileExtension}`);
        break;
      case 'attachments':
        cb(null, `attachments${timestamp}${Math.floor(Math.random() * (90 + 10))}-${timestamp}${fileExtension}`);
        break;
      default:
        break;
    }
  },
});

export const FileUploadInterceptor = FileFieldsInterceptor(
  [
    { name: 'bannerLogo', maxCount: 1 },
    { name: 'donationPortrait', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'causeImage', maxCount: 1 },
    { name: 'profilePicture', maxCount: 1 },
    { name: 'attachments', maxCount: 1 },
  ],
  {
    storage: storage,
    fileFilter: (request: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      //"const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/MOV', 'video/AVI'];"
      const isImage = (mimeType: string): boolean => mimeType.startsWith('image/');
      const isVideo = (mimeType: string): boolean => mimeType.startsWith('video/');

      const isBannerLogoOrDonationImage = ['bannerLogo', 'profilePicture'].includes(file.fieldname);
      const isBanner = ['banner', 'donationPortrait', 'causeImage', 'attachments'].includes(file.fieldname);
      // const isAttachment = file.fieldname === 'attachments';
      if (
        (isBannerLogoOrDonationImage && isImage(file.mimetype)) ||
        (isBanner && (isImage(file.mimetype) || isVideo(file.mimetype)))
        //  || (isAttachment && (isImage(file.mimetype) || isVideo(file.mimetype)))
      ) {
        cb(null, true);
      } else if (file.size > 100 * 1000000) {
        cb(new Error('Image size should not exceed 100MB'));
      } else {
        cb(new Error('Invalid image extension'));
      }
    },
    limits: { fileSize: 100 * 1000000 },
  },
);

export const UploadFile = async (
  bodyValue: string | Buffer,
  uploadDirectory: string,
  fileName: string,
): Promise<string> => {
  // const uploadDirectory = 'public/uploads/csv-files/';

  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }

  const filePath = path.join(uploadDirectory, fileName);

  try {
    await fs.promises.writeFile(filePath, bodyValue);
    return filePath;
  } catch (err) {
    throw new Error(`Failed to upload file: ${err}`);
  }
};
