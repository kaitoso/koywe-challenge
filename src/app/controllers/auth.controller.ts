
import { Controller, Post, Body } from '@nestjs/common';
import { AuthFacade } from '../../context/auth/application/facade/auth.facade';
import { AuthCredentialsDto } from '../../context/auth/application/dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('register')
  async register(@Body() authCredentials: AuthCredentialsDto) {
    return this.authFacade.register(authCredentials);
  }
  
  @Post('login')
  async login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authFacade.login(authCredentials);
  }

}
