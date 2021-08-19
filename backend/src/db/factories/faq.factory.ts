import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { FaqsEntity } from 'src/modules/faqs/faqs.entity';

define(FaqsEntity, (faker: typeof Faker) => {
  const faq = new FaqsEntity();
  faq.question = faker.lorem.sentences(1);
  faq.answer = faker.lorem.sentences(1);
  return faq;
});
