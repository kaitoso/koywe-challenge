import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { User } from '../../domain/class/user';
import { AuthUserRepository } from '../../domain/contracts/auth.user.repository';

@Injectable()
export class PrismaUserRepository implements AuthUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!data) return null;

    return new User(data.id, data.username, data.password);
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        password: user.password,
      },
    });
  }
}
