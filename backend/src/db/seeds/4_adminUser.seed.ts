import { Factory, Seeder } from 'typeorm-seeding';
import { AdminUsers as AdminUser } from '@adminUsers/adminUsers.entity';

export default class CreateAdminUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(AdminUser)().createMany(1);
  }
}
