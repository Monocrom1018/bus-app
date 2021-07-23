import Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as bcrypt from 'bcryptjs';
import { Users as User } from '@users/users.entity';

define(User, (faker: typeof Faker) => {
  const saltRounds = 10;
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const imgUrl = faker.image.imageUrl(400, 400, 'people');
  const uuid = faker.random.uuid();

  const user = new User();
  user.profile_img = imgUrl;
  user.name = `${firstName} ${lastName}`;
  user.encrypted_password = bcrypt.hash('123qwe!', saltRounds);
  user.uuid = uuid;
  return user;
});
