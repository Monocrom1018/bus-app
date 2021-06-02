import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Users as User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.findAll();
    return users;
  }

  async update(path, userUpdateDto) {
    const user = await this.usersRepository.findOne({
      email: 'test01@bus.com',
    });
    if (!user) {
      return 'Unauthorized';
    }
    user.profile_img = path;
    user.save();
    return;
  }
}
