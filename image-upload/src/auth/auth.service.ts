import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ImgService } from '../img/img.service';
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
    // return this.userRepository.find();
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: 1 })
      .leftJoinAndSelect('user.imgs', 'img')
      .getMany();
  }

  async login(user: any) {
    const payload = { name: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //decode token
  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  //logout
  async logout(token: string) {
    //destroy token
    return 'logout';
  }

  //refresh token
  async refreshToken(user: any) {
    const payload = { name: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserByID(id: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .leftJoinAndSelect('user.imgs', 'img')
      .getMany();
  }
}
