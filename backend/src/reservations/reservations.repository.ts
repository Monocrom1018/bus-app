import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Reservations as Reservation } from './reservations.entity';

@EntityRepository(Reservation)
export class ReservationsRepository extends Repository<Reservation> {
  async createReservation(params): Promise<Reservation> {
    const {
      driver,
      departure,
      returnDate,
      departureDate,
      destination,
      totalCharge,
    } = params;

    /**
     *
     * 이제 현재유저의 id만 찾으면 구성요건은 모두 갖춘 것
     * state: waiting 으로 M:N 테이블만 딱딱 생성하면 db작업은 끝!
     *
     */

    return;
  }
}
