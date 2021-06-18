import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ReservationsUsers } from '@reservations_users/reservations_users.entity';
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

    const userSide = new ReservationsUsers();
    userSide.user = user;
    await ReservationsUsers.save(userSide);

    const driverSide = new ReservationsUsers();
    driverSide.user = driver;
    await ReservationsUsers.save(driverSide);

    const reservation = new Reservation();
    reservation.departure = departure;
    reservation.departureDate = departureDate;
    reservation.returnDate = returnDate;
    reservation.destination = destination;
    reservation.stopover = stopovers;
    reservation.price = totalCharge;
    reservation.people = people;
    reservation.accompany = 'together';
    reservation.status = 'waiting';
    reservation.reservationsUsers = [userSide, driverSide];
    await Reservation.save(reservation);

    return reservation;
  }
}
