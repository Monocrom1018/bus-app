import { EntityRepository, Repository } from 'typeorm';
import { AdminUsers as AdminUser } from './adminUsers.entity';

@EntityRepository(AdminUser)
export class AdminUsersRepository extends Repository<AdminUser> {}
