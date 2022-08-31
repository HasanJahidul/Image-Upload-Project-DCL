import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/auth.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, pass): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(signUpDto: SignupDto) {
    const validate = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });
    if (validate) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.create(signUpDto);
    await this.userRepository.save(user);
    return user;
  }
  allUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
