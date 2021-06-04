import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUsersRepository } from './adminUsers.repository';
@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUsersRepository)
    private adminUsersRepository: AdminUsersRepository,
  ) {}
}
