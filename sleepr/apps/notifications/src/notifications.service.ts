import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from '../dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  notifyEmail({ email }: NotifyEmailDto) {
    // TODO: add nodemail and gmail stuff at some point.
    console.log(email);
  }
}
