import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { AdminUsers as AdminUser } from '../../adminUsers/entities/adminUser.entity';

export default class CreateAdminUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(AdminUser)().createMany(1);
  }
}
