import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
// import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { Reservations as Reservation } from './reservations.entity';

@EntityRepository(Reservation)
export class ReservationsRepository extends Repository<Reservation> {
  async createReservation(
    reservationCreateDto: any,
    userId: any,
  ): Promise<Reservation> {
    const { driverId, totalCharge, people } = reservationCreateDto;

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
    await Reservation.save(reservation);

    return reservation;
  }

  async getListById(id: number): Promise<Reservation[]> {
    const reservations = await Reservation.find({
      relations: ['schedules', 'driver', 'user'],
      where: {
        reservation: id,
      },
    });

    return reservations;
  }

  async getListByEmail(myId: number, page): Promise<Reservation[]> {
    const perPage = 3;
    const reservations = await Reservation.find({
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
    const targetReservation = await Reservation.findOne({
      where: { id: reservationId },
    });

    if (status === '취소') {
      if (targetReservation.status === '수락') {
        throw new ConflictException('이미 체결된 예약은 취소할 수 없습니다.');
      }

      await Reservation.delete({
        id: reservationId,
      });

      const restReservations = Reservation.find();
      return restReservations;
    }

    targetReservation.status = status;
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
