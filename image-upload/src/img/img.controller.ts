import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { Request } from 'express';
import { ImgDto } from './dto/img.dto';
import { Img } from './entity/img.entity';

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
  save(@Body() imgDto: ImgDto) {
    return this.imgService.save(imgDto);
  }
  @Get('/getImgById/:id')
  getImgById(@Param('id', ParseIntPipe) id: number) {
    return this.imgService.getImgById(id);
  }

  //upload image to server with nest js
  // @Post('/upload')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(@Req() req: Request) {
  //   const file = req.file;
  //   console.log(file);
  //   return file;
  // }
}
