import { define } from 'typeorm-seeding';
import { AdminUsers as AdminUser } from '../../adminUsers/adminUsers.entity';

define(AdminUser, () => {
  const adminUser = new AdminUser();
  adminUser.email = 'admin@bus.com';
  adminUser.password = '123qwe!';

  return adminUser;
});
