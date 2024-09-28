import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    const emailTaken = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    const passwordHash = await hash(password, 12);

    const newUser = await this.usersRepository.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    const accessToken = await this.generateAccessToken(newUser.id);
    return { accessToken };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new ConflictException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);
    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
