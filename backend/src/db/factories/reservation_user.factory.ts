import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ReservationsUsers as ReservationsUser } from '../../reservations_users/entities/reservations_users.entity';

define(ReservationsUser, (faker: typeof Faker) => {
  const reservations_users = new ReservationsUser();

  //? 여기 값을 어떻게 넣어야 되는거지...??
  // reservations_users.reservation =
  // reservations_users.user =

  return reservations_users;
});
