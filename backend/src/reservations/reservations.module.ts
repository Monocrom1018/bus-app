import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationsRepository])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
