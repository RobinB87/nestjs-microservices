import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // The client proxy allows us to communicate between MS
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) return false;

    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          // add current user on request via the response, which is actually the user itself
          context.switchToHttp().getRequest().user = res;
        }),
        // return true if we have a succesful response from the auth MS
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
