import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ImgModule } from './img/img.module';

@Module({
  imports: [AuthModule, ImgModule],
  controllers: [AppController],
})
export class AppModule {}
