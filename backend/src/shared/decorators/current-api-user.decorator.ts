import {
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { Users as User } from '@users/users.entity';
import { UsersRepository } from '@users/users.repository';
import { ExtractJwt } from 'passport-jwt';

import { JwtGuard } from '@auth/guards/jwt.guard';
import { AuthService } from '@auth/auth.service';

export const getCurrentApiUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token = authorization.split(' ').slice(-1)[0];

    return request.user;
  },
);
