import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Users as User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

define(User, (faker: typeof Faker) => {
  const saltRounds = 10;
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.email = faker.internet.email();
  user.name = `${firstName} ${lastName}`;
  // user.password = faker.internet.password();
  user.encrypted_password = bcrypt.hash('123qwe!', saltRounds);
  // bcrypt.genSalt(saltRounds, (_err: any, salt: any) => {
  //   bcrypt.hash('123qwe!', salt, (_err: any, hash: string) => {
  //     user.encrypted_password = hash; // bcrypt.hash('123qwe!', saltRounds);
  //     // Store hash in database here
  //   });
  // });
  return user;
});
