import { Connection, getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Reservations as Reservation } from '../../reservations/reservations.entity';
import { Users as User } from '../../users/users.entity';

export default class CreateReservations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let reservationIndex = 1;
    let statusIndex = 0;
    const status = ['수락대기중', '수락', '거절'];
    await factory(Reservation)()
      .map(async (reservation) => {
        try {
          let normal = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.name = :name', { name: '김승객' })
            .getOne();

          let driver = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.name = :name', { name: '김기사' })
            .getOne();

          let company = await getRepository(User)
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
          console.log(error);

          let normal = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'normal' })
            .getOne();

          let driver = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.user_type = :user_type', { user_type: 'driver' })
            .getOne();

          let company = await getRepository(User)
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
