import { UserCreateDto } from './dto/user-create.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Users as User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(userCreateDto: UserCreateDto): Promise<User> {
    const { email, password, password_confirmation, name } = userCreateDto;

    const user = new User();
    user.email = email;
    user.name = name;
    user.encrypted_password = await bcrypt.hash(`${password}`, 10);
    // user.password = await this.hashPassword(
    //   `${password}`,
    //   user.encrypted_password,
    // );

    try {
      await user.save();
    } catch (error) {
      // duplicate email
      if (error.code === '23505') {
        throw new ConflictException('email alerady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async validateUserPassword(userCreateDto: UserCreateDto): Promise<User> {
    const { email, password } = userCreateDto['user'];

    const user = await this.findOne({ email });
    if (user && (await user.validateUserPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(
    password: string,
    encrypted_password: string,
  ): Promise<string> {
    return bcrypt.hash(password, encrypted_password);
  }

  async findAll(): Promise<User[]> {
    const users = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return users;
  }

  async me(): Promise<User> {
    const user = await this.findOne({
      where: {
        email: 'test01@bus.com',
      },
    });
    return user;
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = await this.findOne({
      where: {
        uuid,
      },
    });
    return user;
  }
}
