/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgDto } from './dto/img.dto';
import * as fs from 'fs';

@Controller('img')
export class ImgController {
  constructor(private imgService: ImgService) {}
  // @Get('/:userId')
  // getImg(@Param('userId', ParseIntPipe) userId: number) {
  //   return this.imgService.getImg(userId);
  // }
  // @Get('/by/:id')
  // getImgById(@Param('id', ParseIntPipe) id: number) {
  //   return this.imgService.getImgById(id);
  // }
  @Get('/')
  getImg() {
    return this.imgService.getImg();
  }
  @Get('/getImgById/:id')
  getImgById(@Param('id', ParseIntPipe) id: number) {
    return this.imgService.getImgById(id);
  }
  @Post('/upload')
  async upload(@Body() imgDto: ImgDto) {
    return this.imgService.save(imgDto);
  }
}
