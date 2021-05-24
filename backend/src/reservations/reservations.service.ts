import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsRepository } from './reservations.repository';
import { Reservations as Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsRepository)
    private reservationsRepository: ReservationsRepository,
  ) {}
}
