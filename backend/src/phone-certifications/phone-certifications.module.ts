import { Module } from '@nestjs/common';
import { PhoneCertificationsController } from './phone-certifications.controller';
import { PhoneCertificationsService } from './phone-certifications.service';

@Module({
  controllers: [PhoneCertificationsController],
  providers: [PhoneCertificationsService],
})
export class PhoneCertificationsModule {}
