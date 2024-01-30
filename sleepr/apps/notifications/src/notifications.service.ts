import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from '../dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  // private readonly transport = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: this.configService.get('SMTP_USER'),
  //     clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //     clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
  //     refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
  //   },
  // });

  notifyEmail({ email, text }: NotifyEmailDto) {
    console.log(email, text);
    // TODO: add nodemailer and gmail stuff at some point.
    // await this.transporter.sendMail({
    //   from: this.configService.get('SMTP_USER'),
    //   to: email,
    //   subject: 'Sleepr Notification',
    //   text,
    // });
  }
}
