import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Reservations_users } from '../../reservations_users/entities/reservations_users.entity';

define(Reservations_users, (faker: typeof Faker) => {
  const reservations_users = new Reservations_users();

  //? 여기 값을 어떻게 넣어야 되는거지...??
  // reservations_users.reservation =
  // reservations_users.user =

  return reservations_users;
});
