import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { Img } from './img/entity/img.entity';
import { ImgModule } from './img/img.module';

@Module({
  imports: [
    AuthModule,
    ImgModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dcl',
      entities: [User, Img],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
