import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ReservationsEntity } from '@reservations/reservations.entity';

define(ReservationsEntity, (faker: typeof Faker) => {
  const reservation = new ReservationsEntity();
  reservation.people = faker.random.number({ min: 10, max: 30 });
  return reservation;
});
