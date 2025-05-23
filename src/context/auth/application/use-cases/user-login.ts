import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserRepository } from '../../domain/contracts/auth.user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserLogin {
  constructor(
    @Inject('AuthUserRepository')
    private readonly userRepository: AuthUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async run(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
