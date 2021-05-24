import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Reservations as Reservation } from '../../reservations/entities/reservation.entity';

export default class CreateReservations implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Reservation)().createMany(5);
  }
}
