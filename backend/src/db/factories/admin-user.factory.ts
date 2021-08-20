import { define } from 'typeorm-seeding';
import { AdminUsersEntity } from '@admin-users/admin-users.entity';

define(AdminUsersEntity, () => {
  const adminUser = new AdminUsersEntity();
  adminUser.email = 'admin@bus.com';
  adminUser.password = '123qwe!';

  return adminUser;
});
