import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config'; // abstract the nest module

@Module({
  imports: [NestConfigModule.forRoot()],
})
export class ConfigModule {}
