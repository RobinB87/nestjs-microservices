import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // bind to all interfaces on the host
      port: configService.get('TCP_PORT'),
    },
  });

  app.use(cookieParser()); // middleware (all requests with cookie will execute through this)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices(); // start our ms up over TCP and listen for events and requests

  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
