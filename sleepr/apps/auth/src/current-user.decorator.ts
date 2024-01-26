import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from './users/entities/user.schema';

// user gets returned from verifyUser method in local strategy
// then gets automatically added to the request object
const getCurrentUserByContext = (context: ExecutionContext): UserDocument =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
