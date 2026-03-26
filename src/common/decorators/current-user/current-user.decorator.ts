import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest<Request>();
      return req.user as UserEntity;
    }
    try {
      const gqlCtx = GqlExecutionContext.create(ctx).getContext();
      return gqlCtx.req.user as unknown as UserEntity;
    } catch (error) {
      throw new UnauthorizedException('Invalid context type', error);
    }
  },
);
