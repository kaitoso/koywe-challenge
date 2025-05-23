import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';
import { AuthControllerModule } from './modules/auth.controller.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthControllerModule,
  PrismaModule
],
})
export class AppModule {}
