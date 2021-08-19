import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { NoticesEntity } from '@notices/notices.entity';

define(NoticesEntity, (faker: typeof Faker) => {
  const notice = new NoticesEntity();
  notice.title = faker.lorem.sentences(1);
  notice.body = faker.lorem.sentences(1);
  return notice;
});
