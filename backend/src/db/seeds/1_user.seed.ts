import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Users as User, UserType } from '../../users/users.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let userIndex = 1;
    await factory(User)()
      .map(async (user) => {
        user.email = `test${('0' + userIndex++).slice(-2)}@bus.com`;
        user.user_type = userIndex < 10 ? UserType.NORMAL : UserType.DRIVER;
        return user;
      })
      .createMany(20);
  }
}
