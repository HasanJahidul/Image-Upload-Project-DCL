import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { Request } from 'express';

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

  //print post value
  @Post('/save')
  save(@Body() path: string) {
    return this.imgService.save(path);
  }
}
