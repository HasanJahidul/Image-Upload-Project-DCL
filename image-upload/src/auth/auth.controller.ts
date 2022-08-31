import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';
import { User } from './entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
  @Get('/')
  allUser(): Promise<User[]> {
    return this.authService.allUser();
  }
  @Post('/save')
  save(@Req() req: Request) {
    console.log('sdfsdf');
    console.log(req.body);
    return req.body;
  }
}
