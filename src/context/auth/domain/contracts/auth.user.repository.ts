import { User } from '../class/user';

export interface AuthUserRepository {
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<void>;
}