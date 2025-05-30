import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import * as crypto from 'crypto';
import { randomBytes } from 'crypto';
import { renderFile } from 'ejs';
import * as pdf from 'html-pdf';
import { Json2CsvOptions, json2csv } from 'json-2-csv';
import { DateTime, DurationLikeObject } from 'luxon';
import * as moment from 'moment';
import { PipelineStage } from 'mongoose';
import * as path from 'path';
import { Defaults } from './configs/default.config';
import { FilterDto } from './dtos/filter.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { EmailData, FilterData } from './types';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}
  /**
   * Description - Generate random string common function
   * @param length number
   * @returns random string
   */
  public generateToken(length: number): string {
    const char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charLength = char.length;

    const randomBytesFromCrypto = randomBytes(length);
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = randomBytesFromCrypto[i] % charLength;
      result += char.charAt(randomIndex);
    }

    return result;
  }


  /**
   * Description - Add time in current time common function
   * @param durationObject
   * @returns string value
   */
  public addTimeInCurrentTime(durationObject: DurationLikeObject): string {
    return DateTime.now().plus(durationObject).toUTC().toISO();
  }

  /**
   * Description - Convert plain text to hash common function
   * @param plainText string
   * @returns Hash Password
   */
  public async hashPassword(plainText: string): Promise<string> {
    const salt = await genSalt(Defaults.SALT_ROUND);
    return hash(plainText, salt);
  }

  /**
   * Description - Compare password common function
   * @param password string
   * @param userPassword string
   * @returns True | False
   */
  public async comparePassword(password: string, userPassword: string): Promise<boolean> {
    return compare(userPassword, password);
  }

  /**
   * Description - Get Pagination common stage
   * @param query PaginationDto
   * @returns Common pagination pipeline stage
   */
  public getPaginationStages(query: PaginationDto): PipelineStage[] {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;

    return [
      {
        $group: {
          _id: null,
          totalData: { $sum: 1 },
          list: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          totalData: 1,
          list: {
            $slice: ['$list', startIndex, limit],
          },
        },
      },
    ];
  }

 
  public commonTitle(str: string): string {
    const newString = str.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ');
    return newString.split(' ').join('-');
  }

  /**
   * Description - Export CSV file common function
   * @param Data array
   * @param field array
   * @returns csv file
   */
  public convertJsonToCsv(data: any[], fields: string[], newFieldNames: string[]): string {
    const csvData = data.map((item) =>
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          fields.indexOf(key) !== -1 ? newFieldNames[fields.indexOf(key)] : key,
          value,
        ]),
      ),
    );

    return json2csv(csvData, { fields: newFieldNames } as Json2CsvOptions);
  }

  public encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const key = Buffer.from('c2FmZGZnc2RhZ2FyZ3R3cmdyZ2ZlYWY= ', 'utf-8');

    // Use a secure mode (GCM) and ensure authenticated encryption
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    // Ensure the use of the default padding scheme is not necessary with GCM mode

    // Encrypt the text
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    // Get the authentication tag
    const tag = cipher.getAuthTag();

    // Return IV, authentication tag, and encrypted text
    return iv.toString('hex') + ':' + encrypted + ':' + tag.toString('hex');
  }

  public decrypt(encryptedText: string): string {
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedData = Buffer.from(parts[1], 'hex');
  const tag = Buffer.from(parts[2], 'hex');

  const key = Buffer.from('c2FmZGZnc2RhZ2FyZ3R3cmdyZ2ZlYWY=', 'utf-8');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  // decrypt returns buffers, so collect buffers and convert to string after
  const decryptedBuffer = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);

  return decryptedBuffer.toString('utf-8');
}


  public getUniqueRandomNumber(min: number, max: number): number {
    const secureRandom = crypto.randomInt(min * 1000, max * 1000);
    const sum = min + max;
    const uniqueNumber = ((secureRandom + sum) % 90000) + 10000;
    return uniqueNumber;
  }

  /**
   * Formats a given amount to a string with two decimal places.
   *
   * @param {number} amount - The number to be formatted.
   * @returns {string} - The formatted number as a string with two decimal places.
   */
  public formatAmount(amount: number): string {
    if (!amount) {
      return '0';
    }
    return amount.toFixed(2);
  }

  /**
   * Formats a given date string to ISO format with the start of the day in UTC.
   *
   * @param {string} dateString - The date string to format.
   * @returns {string} - The formatted date string in 'YYYY-MM-DDTHH:mm:ss.SSSZ' format.
   */
  public formatDate(dateString: string): string {
    return moment(dateString).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  }

  /**
   * Calculates the total amount by adding a percentage-based charge to the given amount.
   *
   * @param {number} amount - The original amount.
   * @param {number} percentage - The percentage charge to be added (must be between 0 and 4).
   * @returns {{ totalAmount: number, charge: number }} - An object containing the total amount after adding the percentage charge and the charge itself.
   */
  public calculateAmountWithCharge(amount: number, percentage: number): { totalAmount: number; charge: number } {
    const charge = (percentage / 100) * amount;
    const totalAmount = amount + charge;

    return { totalAmount, charge };
  }

  /**
   * Calculates the total amount by adding a fixed plate fee to the donation amount.
   *
   * @param {number} amount - The donation amount.
   * @param {number} plateFormFee - The fixed plate fee per donation.
   * @returns {number} - The total amount after adding the plate fee to the donation amount.
   */
  public calculateTotalAmount(amount: number, plateFormFee: number): number {
    const totalAmount = amount + plateFormFee;
    return totalAmount;
  }

  /**
   * Converts a given amount to a decimal with two decimal places.
   * @param {number} amount - The amount to convert.
   * @returns {number} - The converted amount as a decimal with two decimal places.
   */
  public convertToDecimal(amount: number): number {
    return parseFloat(amount.toFixed(2));
  }

  public generatePassword(length = 12, includeNumbers = true, includeSpecialChars = true): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let characters = lowercase + uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSpecialChars) characters += specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    return password;
  }

  public formatDateWithTime(dateString: string): string {
    const date = new Date(dateString);

    // Extract date parts
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    // Extract time parts
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;
    // Format the date and time
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  }
}
