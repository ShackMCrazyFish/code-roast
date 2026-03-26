import { ConflictException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { RegisterDto } from '../dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: RegisterDto): Promise<UserEntity> {
    const existingUser = await this.usersService.userByUsername(dto.username);
    if (existingUser) {
      throw new ConflictException('User already exists with this username');
    }

    const user = await this.usersService.create(dto);
    return new UserEntity(user);
  }

  async validateUser(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersService.userByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    return new UserEntity(user);
  }
}
