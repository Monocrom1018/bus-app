import { UsersService } from '../../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwkStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(uuid: string): Promise<any> {
    const user = await this.usersService.findByUuid(uuid);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
