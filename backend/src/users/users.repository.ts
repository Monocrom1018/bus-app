import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { Users as User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password, password_confirmation, name } = authCredentialsDto[
      'user'
    ];

    const user = new User();
    user.email = email;
    user.name = name;
    user.encrypted_password = await bcrypt.hash(password, 10);
    user.password = await this.hashPassword(password, user.encrypted_password);

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

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto['user'];

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
    // 에러 부분 디버깅
    const users = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return users;
  }
}
