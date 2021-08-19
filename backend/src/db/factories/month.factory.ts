import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { MonthsEntity } from '@months/months.entity';

define(MonthsEntity, (faker: typeof Faker) => {
  const month = new MonthsEntity();

  return month;
});
