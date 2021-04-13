import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Categories as Category } from '../../categories/entities/category.entity';

define(Category, (faker: typeof Faker) => {
  const category = new Category();
  category.body = faker.lorem.sentences(5);
  return category;
});
