import { UserLogin } from '../../../src/context/auth/application/use-cases/user-login';
import { AuthUserRepository } from '../../../src/context/auth/domain/contracts/auth.user.repository';
import { User } from '../../../src/context/auth/domain/class/user';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UserLogin', () => {
  let userLogin: UserLogin;
  let mockRepo: AuthUserRepository;
  let mockJwtService: JwtService;

  beforeEach(() => {
    mockRepo = {
      findByUsername: jest.fn(),
      save: jest.fn(),
    };

    mockJwtService = {
      signAsync: jest.fn(),
    } as any;

    userLogin = new UserLogin(mockRepo, mockJwtService);
  });

  it('genera JWT si las credenciales son válidas', async () => {
    const username = 'user-test';
    const password = '1234';
    const hashed = await bcrypt.hash(password, 10);
    const user = new User('id-123', username, hashed);

    (mockRepo.findByUsername as jest.Mock).mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    (mockJwtService.signAsync as jest.Mock).mockResolvedValue('token-jwt');

    const result = await userLogin.run(username, password);

    expect(result).toEqual({ accessToken: 'token-jwt' });
    expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: user.id, username });
  });

  it('Unauthorized si el usuario no existe', async () => {
    (mockRepo.findByUsername as jest.Mock).mockResolvedValue(null);

    await expect(userLogin.run('noexiste', '1234')).rejects.toThrow(UnauthorizedException);
  });

  it('Unauthorized si la contraseña es incorrecta', async () => {
    const user = new User('id-456', 'user-test', 'hashed-pass');

    (mockRepo.findByUsername as jest.Mock).mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    await expect(userLogin.run('user-test', 'wrongpass')).rejects.toThrow(UnauthorizedException);
  });
});
