import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users } from '@users/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Reservations as Reservation } from './reservations.entity';

@EntityRepository(Reservation)
export class ReservationsRepository extends Repository<Reservation> {
  async createReservation(params): Promise<Reservation> {
    const {
      user,
      driver,
      departure,
      returnDate,
      departureDate,
      destination,
      stopovers,
      totalCharge,
      people,
    } = params;

    const existingCheck = await Reservation.findOne({
      where: {
        user: user,
        driver: driver,
        status: '수락대기중',
      },
    });

    if (existingCheck) {
      throw new ConflictException('reservation already exists');
    }

    const reservation = new Reservation();
    reservation.departure = departure;
    reservation.departureDate = departureDate;
    reservation.returnDate = returnDate;
    reservation.destination = destination;
    reservation.stopover = stopovers;
    reservation.price = totalCharge;
    reservation.people = people;
    reservation.accompany = '출발, 복귀 시 동행';
    reservation.status = '수락대기중';
    reservation.user = user;
    reservation.driver = driver;
    await Reservation.save(reservation);

    return reservation;
  }

  async getAllFromUser(me): Promise<Reservation[]> {
    const reservations = await Reservation.find({
      relations: ['driver'],
      where: {
        user: me,
      },
    });

    return reservations;
  }
}
