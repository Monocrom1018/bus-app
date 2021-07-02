import { Users } from '@users/users.entity';
import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Reservations as Reservation } from '../../reservations/reservations.entity';

define(Reservation, (faker: typeof Faker) => {
  const reservation = new Reservation();

  reservation.departure = faker.address.city();
  // reservation.stopover = faker.address.city();
  reservation.destination = faker.address.city();

  reservation.departureDate = faker.date.recent();
  reservation.returnDate = faker.date.recent();

  reservation.people = faker.random.number({ min: 10, max: 30 });
  reservation.accompany = '출발, 복귀만';
  reservation.price = Number(faker.commerce.price());

  return reservation;
});
