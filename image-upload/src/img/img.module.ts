import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Img } from './entity/img.entity';
import { ImgController } from './img.controller';
import { ImgService } from './img.service';

@Module({
  controllers: [ImgController],
  providers: [ImgService],
  imports: [TypeOrmModule.forFeature([Img])],
})
export class ImgModule {}
