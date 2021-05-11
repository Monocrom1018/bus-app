import { FaqsRepository } from './faqs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FaqsController } from './faqs.controller';
import { FaqsService } from './faqs.service';

@Module({
  imports: [TypeOrmModule.forFeature([FaqsRepository])],
  controllers: [FaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}
