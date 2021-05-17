import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { AdminUsers as AdminUser } from '../../adminUsers/entities/adminUser.entity';

define(AdminUser, (faker: typeof Faker) => {
  const adminUser = new AdminUser();
  adminUser.email = 'admin@bus.com';
  adminUser.password = '123qwe!';

  return adminUser;
});
