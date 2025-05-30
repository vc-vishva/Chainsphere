import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonMailService } from './notification/mail.service';

@Global()
@Module({
  providers: [CommonService, CommonMailService],
  exports: [CommonService, CommonMailService],
})
export class CommonModule {}
