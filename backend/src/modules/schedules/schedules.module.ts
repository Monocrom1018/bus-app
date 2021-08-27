import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { SchedulesRepository } from './schedules.repository';
import { ReservationsModule } from '@reservations/reservations.module';

@Module({
  imports: [
    forwardRef(() => ReservationsModule),
    TypeOrmModule.forFeature([SchedulesRepository]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
