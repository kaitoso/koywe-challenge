import { UserRegister } from '../../../src/context/auth/application/use-cases/user-register';
import { AuthUserRepository } from '../../../src/context/auth/domain/contracts/auth.user.repository';
import { User } from '../../../src/context/auth/domain/class/user';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UserRegister', () => {
  let register: UserRegister;
  let mockRepository: AuthUserRepository;

  beforeEach(() => {
    mockRepository = {
      findByUsername: jest.fn(),
      save: jest.fn(),
    };

    register = new UserRegister(mockRepository);
  });

  it('registra usuario si el username no existe', async () => {
    const username = 'user1';
    const password = '1234';

    (mockRepository.findByUsername as jest.Mock).mockResolvedValue(null);
    (mockRepository.save as jest.Mock).mockResolvedValue(undefined);

    const spy = jest.spyOn(bcrypt, 'hash');

    await register.run(username, password);

    expect(mockRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(spy).toHaveBeenCalledWith(password, 10);

    expect(mockRepository.save).toHaveBeenCalledWith(expect.any(User));
    const user = (mockRepository.save as jest.Mock).mock.calls[0][0];

    expect(user.username).toBe(username);
    expect(user.password).not.toBe(password);
});

it('ConflictException si el usuario ya existe', async () => {
  (mockRepository.findByUsername as jest.Mock).mockResolvedValue(new User('id', 'user1', 'hashed'));

  await expect(register.run('juan', '1234')).rejects.toThrow(ConflictException);
  expect(mockRepository.save).not.toHaveBeenCalled();
});
});
