import { ConflictException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { RegisterDto } from '../dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity): Promise<AuthResponseDto> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByUsername(dto.username);
    if (existingUser) {
      throw new ConflictException('User already exists with this username');
    }

    const user = await this.usersService.create(dto);

    return this.login(user);
  }

  async validateUser(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersService.findByUsername(username);
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
