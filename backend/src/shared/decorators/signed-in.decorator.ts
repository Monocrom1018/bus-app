import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users as User } from '@users/users.entity';
import { JwtGuard } from '@auth/guards/jwt.guard';

export const isSignedIn = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
