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

  async getAllFromUser(myId): Promise<Reservation[]> {
    const reservations = await Reservation.find({
      relations: ['driver'],
      where: [
        {
          user: myId,
        },
        {
          driver: myId,
        },
      ],
      order: {
        createdAt: 'DESC',
      },
    });

    return reservations;
  }

  async updateReservation(param) {
    const targetReservation = await Reservation.findOne({
      where: { id: param.reservationId },
    });

    if (param.status === '취소') {
      if (targetReservation.status === '수락') {
        throw new ConflictException('이미 체결된 예약은 취소할 수 없습니다.');
      }

      await Reservation.delete({
        id: param.reservationId,
      });

      const restReservations = Reservation.find();
      return restReservations;
    }

    targetReservation.status = param.status;
    Reservation.save(targetReservation);

    return targetReservation;
  }
}
