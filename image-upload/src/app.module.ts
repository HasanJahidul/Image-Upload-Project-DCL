import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { Img } from './img/entity/img.entity';
import { ImgModule } from './img/img.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/files'),
      serveRoot:"/img/download"
    }),AuthModule,
    ImgModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '127.0.0.1',
      host: '54.172.111.129',
      port: 3306,
      username: 'dcl',
      password: 'dcl',
      database: 'dcl',
      entities: [User, Img],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
