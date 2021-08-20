import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUsersRepository } from './admin-users.repository';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUsersRepository)
    private adminUsersRepository: AdminUsersRepository,
  ) {}
}
