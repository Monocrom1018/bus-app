import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Peaks as Peak } from '../../peaks/peaks.entity';

define(Peak, (faker: typeof Faker) => {
  const peak = new Peak();

  return peak;
});
