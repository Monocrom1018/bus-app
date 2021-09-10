import { Connection, getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ReservationsEntity } from '@reservations/reservations.entity';
import { UsersEntity } from '@users/users.entity';

export default class CreateReservations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let reservationIndex = 1;
    let statusIndex = 0;
    const status = ['수락대기중', '수락', '거절'];
    await factory(ReservationsEntity)()
      .map(async (reservation) => {
        try {
          const normal = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.name = :name', { name: '김승객' })
            .getOne();

          const driver = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.name = :name', { name: '김기사' })
            .getOne();

          const company = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.name = :name', { name: '김회사' })
            .getOne();

          if (statusIndex === 3) {
            statusIndex = 0;
          }

          if (reservationIndex < 5) {
            reservation.user = normal;
            reservation.driver = driver;
            reservation.status = status[statusIndex];
            reservationIndex++;
            statusIndex++;
          }
          if (reservationIndex >= 5) {
            reservation.user = normal;
            reservation.driver = company;
            reservation.status = status[statusIndex];
            reservationIndex++;
            statusIndex++;
          }
        } catch (error) {
          const normal = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'normal' })
            .getOne();

          const driver = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'driver' })
            .getOne();

          const company = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'company' })
            .getOne();

          if (statusIndex === 3) {
            statusIndex = 0;
          }

          if (reservationIndex < 4) {
            reservation.user = normal;
            reservation.driver = driver;
            reservation.status = status[statusIndex];
            reservationIndex++;
            statusIndex++;
          }
          if (reservationIndex >= 4) {
            reservation.user = normal;
            reservation.driver = company;
            reservation.status = status[statusIndex];
            reservationIndex++;
            statusIndex++;
          }
        }

        return reservation;
      })
      .createMany(9);
  }
}
