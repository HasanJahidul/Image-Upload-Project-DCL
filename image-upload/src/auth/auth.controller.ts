/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';
import { User } from './entity/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/getUserByID/:id')
  getUserByID(@Param('id') id): Promise<User[]> {
    return this.authService.getUserByID(id);
  }

  @Get('/current-user')
  async currentUser(@Req() req: Request) {
    //decode token\
    if (
      req.headers.authorization == undefined ||
      req.headers.authorization == ''
    ) {
      throw new HttpException('Token is not found', HttpStatus.BAD_REQUEST);
    }
    const decoded = await this.authService.decodeToken(
      req.headers.authorization,
    );
    console.log(req.headers.authorization);
    console.log('hg');

    return decoded;
  }

  @Get('/refresh-token')
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req.headers.authorization);
  }
}
