import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Reservations as Reservation } from './entities/reservation.entity';

@EntityRepository(Reservation)
export class ReservationsRepository extends Repository<Reservation> {}
