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
      userId,
      driverId,
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
        user: userId,
        driver: driverId,
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
    reservation.user = userId;
    reservation.driver = driverId;
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
