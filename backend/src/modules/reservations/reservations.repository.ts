import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ReservationsEntity } from './reservations.entity';

@EntityRepository(ReservationsEntity)
export class ReservationsRepository extends Repository<ReservationsEntity> {
  async createReservation(
    reservationCreateDto: any,
    userId: any,
  ): Promise<ReservationsEntity> {
    const {
      driverId,
      totalCharge,
      people,
      totalDistance,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
    } = reservationCreateDto;

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

    try {
      reservation.user = userId;
      reservation.driver = driverId;
      reservation.total_price = totalCharge;
      reservation.people = people;
      reservation.total_distance = totalDistance;
      reservation.departureDate = departureDate;
      reservation.departureTime = departureTime;
      reservation.returnDate = returnDate;
      reservation.returnTime = returnTime;
      reservation.status = '수락대기중';
      await ReservationsEntity.save(reservation);
    } catch (err) {
      throw new ConflictException(
        '예약이 전달되지 않았습니다. 다시 시도해주세요',
      );
    }

    return reservation;
  }

  async getListById(id: number): Promise<ReservationsEntity[]> {
    const reservations = await ReservationsEntity.find({
      relations: ['schedules', 'driver', 'user'],
      where: {
        id,
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
