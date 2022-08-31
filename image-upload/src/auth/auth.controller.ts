import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';
import { User } from './entity/user.entity';
import { Request, Response } from 'express';

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
  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  allUser(): Promise<User[]> {
    return this.authService.allUser();
  }
  @Get('/getUserByID/:id')
  getUserByID(@Param('id') id): Promise<User[]> {
    return this.authService.getUserByID(id);
  }
  @Post('/save')
  save(@Req() req: Request) {
    console.log('sdfsdf');
    console.log(req.body);
    return req.body;
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
  @Get('/logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.headers.authorization);
  }
}
