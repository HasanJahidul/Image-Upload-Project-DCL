import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(loginDto): string {
    return loginDto;
  }
  signUp(): string {
    return 'SignUp';
  }
  allUser(): string {
    return 'AllUser';
  }
}
