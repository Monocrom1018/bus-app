import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Months as Month } from '@months/months.entity';

define(Month, (faker: typeof Faker) => {
  const month = new Month();

  return month;
});
