import { UserCreateDto } from './dto/user-create.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { Users as User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<string> {
    const user = await this.usersRepository.signUp(userCreateDto);

    if (!user) {
      throw new NotAcceptableException();
    }

    return 'user created';
  }

  async findAll(): Promise<User[]> {
    const users = this.usersRepository.findAll();
    return users;
  }

  async update(filename, userUpdateDto) {
    const user = await this.usersRepository.findOne({
      email: 'test01@bus.com',
    });
    if (!user) {
      return 'Unauthorized';
    }

    user.profile_img = `${process.env.SERVER_ADDRESS}/images/${filename}`;
    user.save();
    return;
  }

  async me() {
    const users = this.usersRepository.me();
    return users;
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = this.usersRepository.findByUuid(uuid);
    return user;
  }

  async getInformation() {
    const user = await this.usersRepository.findOne({
      email: 'test01@bus.com',
    });
    return user;
  }
}
