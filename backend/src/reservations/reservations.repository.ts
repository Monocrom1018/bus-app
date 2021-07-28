import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Reservations as Reservation } from './reservations.entity';

@EntityRepository(Reservation)
export class ReservationsRepository extends Repository<Reservation> {
  async createReservation(
    reservationCreateDto: any,
    userId: any,
  ): Promise<Reservation> {
    const {
      driverId,
      departure,
      returnDate,
      departureDate,
      destination,
      lastDestination,
      stopoversArray,
      totalCharge,
      people,
    } = reservationCreateDto;

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
    reservation.lastDestination =
      lastDestination === '' ? destination : lastDestination;
    reservation.stopover = stopoversArray;
    reservation.price = totalCharge;
    reservation.people = people;
    reservation.accompany = '모듬일정 동행';
    reservation.status = '수락대기중';
    reservation.user = userId;
    reservation.driver = driverId;
    await Reservation.save(reservation);

    return reservation;
  }

  async getAllFromUser(myId: number, page: number): Promise<Reservation[]> {
    const perPage = 3;
    const reservations = await Reservation.find({
      relations: ['driver', 'user'],
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
      take: perPage,
      skip: perPage * (page - 1),
    });

    return reservations;
  }

  async updateReservation(param: any) {
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

  async getRevervationUser(param: number) {
    const reservation = await this.findOne({
      where: { id: param },
    });

    return reservation.user;
  }
}
