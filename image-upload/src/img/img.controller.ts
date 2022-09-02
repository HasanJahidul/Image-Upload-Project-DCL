/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { Response, Request } from 'express';
import { ImgDto } from './dto/img.dto';
import { Img } from './entity/img.entity';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';

@Controller('img')
export class ImgController {
  constructor(
    private imgService: ImgService
  ) {}
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

  //print post value
  @Post('/save')
  save(@Body() imgDto: ImgDto) {
    return this.imgService.save(imgDto);
  }
  @Get('/getImgById/:id')
  getImgById(@Param('id', ParseIntPipe) id: number) {
    return this.imgService.getImgById(id);
  }
  @Get('/down')
  async upload(@Body() url:string) {
    return this.imgService.upload(url)
  }
}
