
import { Controller, Post, Body } from '@nestjs/common';
import { AuthFacade } from '../../context/auth/application/facade/auth.facade';
import { AuthCredentialsDto } from '../../context/auth/application/dto/auth-credentials.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('register')
  @ApiBody({
    description: 'Credenciales para registrar un nuevo usuario',
    type: AuthCredentialsDto,
    examples: {
      example1: {
        summary: 'Ejemplo de registro',
        value: {
          username: 'testuser',
          password: 'securepassword'
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado y autenticado',
    schema: {
      example: {
        message: 'User registered',
        token: {
          accessToken: 'eyJhbGciOi...'
        }
      },
    },
  })
  async register(@Body() authCredentials: AuthCredentialsDto) {
    return this.authFacade.register(authCredentials);
  }
  
  @Post('login')
  @ApiBody({
    description: 'Credenciales de acceso',
    type: AuthCredentialsDto,
    examples: {
      example1: {
        summary: 'Ejemplo de login',
        value: {
          username: 'testuser',
          password: 'securepassword'
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'JWT emitido',
    schema: {
      example: {
        accessToken: 'eyJhbGciOi...'
      },
    },
  })
  async login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authFacade.login(authCredentials);
  }

}
