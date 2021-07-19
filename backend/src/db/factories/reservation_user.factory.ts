import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ReservationsUsers as ReservationsUser } from '@reservations_users/reservations_users.entity';

define(ReservationsUser, (faker: typeof Faker) => {
  const reservations_users = new ReservationsUser();
  return reservations_users;
});
