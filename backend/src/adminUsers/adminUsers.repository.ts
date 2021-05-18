import { EntityRepository, Repository } from 'typeorm';
import { AdminUsers as AdminUser } from './entities/adminUser.entity';

@EntityRepository(AdminUser)
export class AdminUsersRepository extends Repository<AdminUser> {}
