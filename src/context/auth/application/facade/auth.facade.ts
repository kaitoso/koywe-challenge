import { Injectable } from '@nestjs/common';
import { UserRegister } from '../use-cases/user-register';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserLogin } from '../use-cases/user-login';


@Injectable()
export class AuthFacade {
  constructor(
    private readonly userRegister: UserRegister,
    private readonly userLogin: UserLogin,
  ) {}

  async register(authCredentials: AuthCredentialsDto) {
    const {username, password} = authCredentials
    await this.userRegister.run(username, password);
    const token = await this.userLogin.run(username, password);
    return { message: 'User registered', token };
  }

  async login(authCredentials: AuthCredentialsDto) {
    return this.userLogin.run(authCredentials.username, authCredentials.password);
  }

}
