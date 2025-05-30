import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { EmailVerify, emailVerifySchema } from './schemas/email-verify.schema';
import { Lead, LeadSchema } from './schemas/email.schema';
import { ForgotPassword, forgotPasswordSchema } from './schemas/forgot-password.schema';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailVerify.name, schema: emailVerifySchema },
      { name: ForgotPassword.name, schema: forgotPasswordSchema },
      { name: Lead.name, schema: LeadSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
