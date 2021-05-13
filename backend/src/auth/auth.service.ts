import { UsersRepository } from '../users/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() // Interceptor 같은 개념
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = await this.usersRepository.signUp(authCredentialsDto);

    if (!user) {
      throw new NotAcceptableException();
    }

    const payload = { user_id: user.id, user: JSON.stringify(user) };
    console.log(payload);
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    // 예외처리 필요
    const user = await this.usersRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { user_id: user.id, user: JSON.stringify(user) };
    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }

  async token(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return '1';
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
