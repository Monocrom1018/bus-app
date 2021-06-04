import { NoticesRepository } from './notices.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoticesRepository])],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
