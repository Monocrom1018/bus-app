import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Status } from './enum';
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
        status: Status.PENDING,
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
      reservation.status = Status.PENDING;
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

  async getListByUserId(userId: number, status: string ,page): Promise<ReservationsEntity[]> {
    const perPage = 3;
    const whereValue = status === '완료' ? [
      {
        user: userId,
        status: status
      },
      {
        driver: userId,
        status: status
      },
    ] : [
      {
        user: userId,
      },
      {
        driver: userId,
      },
    ] 
    const reservations = await ReservationsEntity.find({
      relations: ['schedules', 'driver', 'user', 'review'],
      where: whereValue,
      order: {
        createdAt: 'DESC',
      },
      take: perPage,
      skip: perPage * (page - 1),
    });

    return reservations;
  }

  async updateReservation(reservationUpdateDto, reservationId) {
    const { status } = reservationUpdateDto;
    const targetReservation = await ReservationsEntity.findOne({
      where: { id: reservationId },
    });

    if (status === 'cancel') {
      if (targetReservation.status === '수락') {
        throw new ConflictException('이미 체결된 예약은 취소할 수 없습니다.');
      }

      await ReservationsEntity.delete({
        id: reservationId,
      });

      const restReservations = ReservationsEntity.find();
      return restReservations;
    }

    targetReservation.status = Status[status];
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
