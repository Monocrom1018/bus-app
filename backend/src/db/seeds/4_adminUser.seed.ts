import { Factory, Seeder } from 'typeorm-seeding';
import { AdminUsersEntity } from '@admin-users/admin-users.entity';

export default class CreateAdminUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(AdminUsersEntity)().createMany(1);
  }
}
