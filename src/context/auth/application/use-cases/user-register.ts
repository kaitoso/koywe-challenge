import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { AuthUserRepository } from '../../domain/contracts/auth.user.repository';
import { User } from '../../domain/class/user';

@Injectable()
export class UserRegister {
  constructor(
    @Inject('AuthUserRepository')
    private readonly userRepository: AuthUserRepository) {}

  async run(username: string, pass: string): Promise<void> {
    const userExisting = await this.userRepository.findByUsername(username);
    if (userExisting) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = new User(uuidv4(), username, hashedPassword);
    await this.userRepository.save(user);
  }
}
