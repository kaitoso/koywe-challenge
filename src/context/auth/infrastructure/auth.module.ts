import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthFacade } from '../application/facade/auth.facade';
import { UserRegister } from '../application/use-cases/user-register';
import { UserLogin } from '../application/use-cases/user-login';
import { PrismaUserRepository } from './repository/prisma-user.repository';
import { JwtStrategy } from './providers/jwt.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [
    UserRegister,
    UserLogin,
    AuthFacade,
    {
        provide: 'AuthUserRepository',
        useClass: PrismaUserRepository,
    },
    JwtStrategy,
  ],
  exports: [AuthFacade],
})
export class AuthModule {}
