import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { GenerateReferralDto } from './dtos/referral.dto';
import { ReferralTreeDto } from './dtos/referral-tree.dto';
import { ReferralVolumeQueryDto } from './dtos/referral-volume.query.dto';
import { ReferralAmbassadorStatusQueryDto } from './dtos/referral-ambassador-status.query.dto';
import { RequestVerify } from 'src/common/guards/request-verify.guard';

@UseGuards(RequestVerify)
@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post('generate-link')
  async generateLink(@Body() generateReferralDto: GenerateReferralDto) {
    return this.referralService.generateReferralLink(generateReferralDto);
  }

  @Get('tree')
  async getTree(@Query() query: ReferralTreeDto) {
    return this.referralService.getReferralTree(query.userId);
  }

  @Get('volume')
  async getReferralVolume(@Query() query: ReferralVolumeQueryDto) {
    return this.referralService.getReferralVolume(query.userId);
  }

   @Get('ambassador-status')
  async getAmbassadorStatus(@Query() query: ReferralAmbassadorStatusQueryDto) {
    return this.referralService.getAmbassadorStatus(query.userId);
  }
}
