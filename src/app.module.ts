import { MailerModule } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { winstonOptions } from './common/configs/logger.config';
import { errorMessages } from './common/configs/messages.config';
import { LogCleanerService } from './common/cron.service';
import { GlobalExceptionFilter } from './common/global-exception-filter';
import { ResponseInterceptorService } from './common/interceptors/response-interceptor.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { IcoPhaseModule } from './ico-phase/ico-phase.module';
import { ReferralModule } from './referral/referral.module';
import { TokenPurchaseModule } from './token-purchase/token-purchase.module';
import { WalletModule } from './wallet/wallet.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';
import { SecurityModule } from './security/security.module';


@Module({
  imports: [
    WinstonModule.forRootAsync({ useFactory: () => winstonOptions() }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<string>('SMTP_PORT'),
          auth: {
            user: configService.get<string>('SMTP_USERNAME'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('TOKEN_EXPIRATION'),
        },
      }),
    }),
  
    AuthModule,
    UserModule,
    CommonModule,
    TransactionModule,
    IcoPhaseModule,
    ReferralModule,
    TokenPurchaseModule,
    WalletModule,
    DashboardModule,
    AdminModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptorService,
    },
    {
  provide: APP_PIPE,
  useValue: new ValidationPipe({
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []): BadRequestException => {
      const firstError = validationErrors[0];
      const constraints = firstError?.constraints;

      if (constraints && typeof constraints === 'object') {
        const errorKey = Object.keys(constraints)[0];
        return new BadRequestException(
          constraints[errorKey] || errorMessages.UNEXPECTED_ERROR,
        );
      }

      return new BadRequestException(errorMessages.UNEXPECTED_ERROR);
    },
  }),
},
    LogCleanerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}























