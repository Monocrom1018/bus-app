import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Items as Item } from '../../items/entities/item.entity';

define(Item, (faker: typeof Faker) => {
  const item = new Item();
  item.title = faker.commerce.productName();
  item.price = Number(faker.commerce.price());
  item.description = faker.commerce.productAdjective();
  item.zipcode = faker.address.zipCode();
  item.address1 = faker.address.streetAddress();
  item.address2 = faker.address.streetAddress();
  item.image = faker.image.image();
  item.status = 'test';
  return item;
});
