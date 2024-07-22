import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: Omit<User, 'password'>; access_token: string }> {
    const { email, name, password, username } = registerDto;

    const createUserDto: CreateUserDto = {
      email: email,
      name: name,
      password: password,
      username: username,
    };

    const user = await this.userService.create(createUserDto);

    const payloadJwtSign = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = this.jwtService.sign(payloadJwtSign);

    delete user.password;

    return {
      user: user,
      access_token: token,
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: Omit<User, 'password'>; access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payloadJwtSign = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = this.jwtService.sign(payloadJwtSign);

    delete user.password;

    return {
      user: user,
      access_token: token,
    };
  }
}
