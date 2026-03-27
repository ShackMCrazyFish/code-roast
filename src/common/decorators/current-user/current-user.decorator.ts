import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  if (ctx.getType() === 'http') {
    const req = ctx.switchToHttp().getRequest<{ user: UserEntity }>();

    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }

    return req.user;
  }

  const gqlCtx = GqlExecutionContext.create(ctx).getContext<{
    req: { user: UserEntity };
  }>();

  if (!gqlCtx.req.user) {
    throw new UnauthorizedException('User not found');
  }

  return gqlCtx.req.user;
});
