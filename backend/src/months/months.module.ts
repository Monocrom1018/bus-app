import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthsRepository } from '@months/months.repository';
import { Module } from '@nestjs/common';
import { MonthsService } from '@months/months.service';
import { MonthsController } from '@months/months.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MonthsRepository])],
  controllers: [MonthsController],
  providers: [MonthsService],
  exports: [MonthsService],
})
export class MonthsModule {}
