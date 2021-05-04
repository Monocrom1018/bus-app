import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Users as User } from '../../users/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values(users)
    //   .execute();
    let userIndex = 1;
    await factory(User)()
      .map(async (user) => {
        user.email = `test${('0' + userIndex++).slice(-2)}@insomenia.com`;
        return user;
      })
      .createMany(10);
  }
}
