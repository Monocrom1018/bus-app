import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Users as User } from '../../users/users.entity';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

define(User, (faker: typeof Faker) => {
  const saltRounds = 10;
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const url = [];
  for (let i = 0; i < 20; i++) {
    url.push(faker.image.avatar);
  }

  for (let i = 0; i < url.length; i++) {
    // path for image storage
    const imagePath = path.join(__dirname, '../../../uploads', `${i}.jpg`);
    axios({
      method: 'get',
      url: url[i],
      responseType: 'stream',
    }).then((response) => {
      response.data.pipe(fs.createWriteStream(imagePath));
    });
  }

  const user = new User();
  user.name = `${firstName} ${lastName}`;
  user.encrypted_password = bcrypt.hash('123qwe!', saltRounds);
  // bcrypt.genSalt(saltRounds, (_err: any, salt: any) => {
  //   bcrypt.hash('123qwe!', salt, (_err: any, hash: string) => {
  //     user.encrypted_password = hash; // bcrypt.hash('123qwe!', saltRounds);
  //     // Store hash in database here
  //   });
  // });
  return user;
});
