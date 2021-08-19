import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthsRepository } from 'src/modules/months/months.repository';
import { Module } from '@nestjs/common';
import { MonthsService } from 'src/modules/months/months.service';
import { MonthsController } from 'src/modules/months/months.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MonthsRepository])],
  controllers: [MonthsController],
  providers: [MonthsService],
  exports: [MonthsService],
})
export class MonthsModule {}
