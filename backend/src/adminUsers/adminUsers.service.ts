import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUsersRepository } from './adminUsers.repository';
import { AdminUsers as AdminUser } from './entities/adminUser.entity';
@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUsersRepository)
    private adminUsersRepository: AdminUsersRepository,
  ) {}
}
