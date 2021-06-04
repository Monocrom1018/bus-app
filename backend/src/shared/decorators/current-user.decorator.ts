import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users as User } from '../../users/users.entity';

export const getCurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
