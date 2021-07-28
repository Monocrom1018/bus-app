import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Reservations as Reservation } from '@reservations/reservations.entity';

define(Reservation, (faker: typeof Faker) => {
  const reservation = new Reservation();

  // reservation.departure = faker.address.city();
  // reservation.destination = faker.address.city();

  // reservation.departureDate = faker.date.recent();
  // reservation.returnDate = faker.date.recent();

  reservation.people = faker.random.number({ min: 10, max: 30 });
  // reservation.price = Number(faker.commerce.price());

  return reservation;
});
