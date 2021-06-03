import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Users as User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { createWriteStream } from 'fs';
import { join, parse } from 'path';
import axios from 'axios';

define(User, (faker: typeof Faker) => {
  const saltRounds = 10;
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const imgUrl = faker.image.imageUrl(400, 400, 'people');

  //! 주석처리된 부분들은 파일을 url로부터 직접 폴더에 파일 저장하는 로직(bcrypt 부분 빼고)
  //! 이슈 : createWriteStream 메소드가 파일들을 일부만 받아옴

  // const imagePath = join(
  //   __dirname,
  //   '../../../uploads',
  //   `seed-${Date.now()}.jpg`,
  // );
  // axios({
  //   method: 'get',
  //   url: imgUrl,
  //   responseType: 'stream',
  // }).then((res) => {
  //   res.data.pipe(createWriteStream(imagePath));
  // });

  const user = new User();
  // user.profile_img = `upload/${parse(imagePath).name}${parse(imagePath).ext}`;
  user.profile_img = imgUrl;
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
