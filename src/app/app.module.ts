import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';
import { AuthControllerModule } from './modules/auth.controller.module';
import { QuoteControllerModule } from './modules/quote.contoller.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthControllerModule,
  QuoteControllerModule,
  PrismaModule
],
})
export class AppModule {}
