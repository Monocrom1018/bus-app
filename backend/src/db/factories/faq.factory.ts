import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Faqs as Faq } from '@faqs/faqs.entity';

define(Faq, (faker: typeof Faker) => {
  const faq = new Faq();
  faq.question = faker.lorem.sentences(1);
  faq.answer = faker.lorem.sentences(1);
  return faq;
});
