import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() loginDto: LoginDto): string {
    return this.authService.login(loginDto);
  }
  @Post('/signup')
  signUp(): string {
    return this.authService.signUp();
  }
  @Get('/test')
  allUser(): string {
    return this.authService.allUser();
  }
}
