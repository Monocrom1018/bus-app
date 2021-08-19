import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ReservationsEntity } from './reservations.entity';

@EntityRepository(ReservationsEntity)
export class ReservationsRepository extends Repository<ReservationsEntity> {
  async createReservation(
    reservationCreateDto: any,
    userId: any,
  ): Promise<ReservationsEntity> {
    const { driverId, totalCharge, people, totalDistance } =
      reservationCreateDto;

    const existingCheck = await ReservationsEntity.findOne({
      where: {
        user: userId,
        driver: driverId,
        status: '수락대기중',
      },
    });

    if (existingCheck) {
      throw new ConflictException('reservation already exists');
    }

    const reservation = new ReservationsEntity();
    reservation.user = userId;
    reservation.driver = driverId;
    reservation.total_price = totalCharge;
    reservation.people = people;
    reservation.total_distance = totalDistance;
<<<<<<< HEAD:backend/src/modules/reservations/reservations.repository.ts
    await ReservationsEntity.save(reservation);
=======
    reservation.status = '수락대기중';
    await Reservation.save(reservation);
>>>>>>> dccaea4570f08364d8a9b99a27b95528eaaafe38:backend/src/reservations/reservations.repository.ts

    return reservation;
  }

  async getListById(id: number): Promise<ReservationsEntity[]> {
    const reservations = await ReservationsEntity.find({
      relations: ['schedules', 'driver', 'user'],
      where: {
        reservation: id,
      },
    });

    return reservations;
  }

  async getListByEmail(myId: number, page): Promise<ReservationsEntity[]> {
    const perPage = 3;
    const reservations = await ReservationsEntity.find({
      relations: ['schedules', 'driver', 'user'],
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
    const { reservationId, status } = param;
    const targetReservation = await ReservationsEntity.findOne({
      where: { id: reservationId },
    });

    if (status === '취소') {
      if (targetReservation.status === '수락') {
        throw new ConflictException('이미 체결된 예약은 취소할 수 없습니다.');
      }

      await ReservationsEntity.delete({
        id: reservationId,
      });

      const restReservations = ReservationsEntity.find();
      return restReservations;
    }

    targetReservation.status = status;
    ReservationsEntity.save(targetReservation);

    return targetReservation;
  }

  async getRevervationUser(param: number) {
    const reservation = await this.findOne({
      where: { id: param },
    });

    return reservation.user;
  }
}
