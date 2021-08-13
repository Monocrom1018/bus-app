import { EntityRepository, Repository } from 'typeorm';
import { AdminUsersEntity } from './admin-users.entity';

@EntityRepository(AdminUsersEntity)
export class AdminUsersRepository extends Repository<AdminUsersEntity> {}
