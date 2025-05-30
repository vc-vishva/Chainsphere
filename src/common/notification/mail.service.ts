import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ejs from 'ejs';
import * as path from 'path';
import { CommonMailResponse, EmailData } from '../types';

/**
 *  Common Mail Service
 */
@Injectable()
export class CommonMailService {
  /**
   * Mail Service Dependency
   * @param mailerService
   */
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  /**
   * Description - Common function for preparing data for sending email
   * @param emailData
   * @param templatePath
   * @param options
   * @returns Common Send Email function
   */
  async sendEmailWithTemplate(
    emailData: EmailData,
    templatePath: string,
    options?: ejs.Options,
    emailOptions: ISendMailOptions | object = {},
  ): Promise<CommonMailResponse> {
    const ejsPath = path.join(__dirname, `../notification/templates/${templatePath}`);
    try {
      const template = await ejs.renderFile(ejsPath, { ...emailData, ...options });
      return this.sendEmail({ ...emailOptions, html: template, ...options });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * Description - Common Email Send function
   * @param sendEmailData
   * @returns Message info
   */
  sendEmail(emailOptions: ISendMailOptions): CommonMailResponse {
    return this.mailerService.sendMail({
      from: this.configService.get('EMAIL_FROM'),
      ...emailOptions,
    }) as CommonMailResponse;
  }
}
