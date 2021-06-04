import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Notices as Notice } from '../../notices/notices.entity';

define(Notice, (faker: typeof Faker) => {
  const notice = new Notice();
  notice.title = faker.lorem.sentences(1);
  notice.body = faker.lorem.sentences(1);
  return notice;
});
