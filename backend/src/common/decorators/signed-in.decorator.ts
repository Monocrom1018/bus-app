import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/users.entity';
import { JwtGuard } from '@auth/guards/jwt.guard';

export const isSignedIn = createParamDecorator(
  (_data, ctx: ExecutionContext): UsersEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
