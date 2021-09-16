import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { SchedulesEntity } from '@schedules/schedules.entity';

define(SchedulesEntity, (faker: typeof Faker) => {
  const schedule = new SchedulesEntity();
  return schedule;
});
