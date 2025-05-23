import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthModule } from 'src/context/auth/infrastructure/auth.module';


@Module({
  imports: [AuthModule],
  controllers: [AuthController],
})
export class AuthControllerModule {}