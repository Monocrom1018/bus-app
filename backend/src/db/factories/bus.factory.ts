import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { BusesEntity } from '@buses/buses.entity';

define(BusesEntity, (faker: typeof Faker) => {
  const bus = new BusesEntity();
  return bus;
});
