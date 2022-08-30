import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ImgService } from './img.service';

@Controller('img')
export class ImgController {
  constructor(private imgService: ImgService) {}
  @Get('/:userId')
  getImg(@Param('userId', ParseIntPipe) userId: number) {
    return this.imgService.getImg(userId);
  }
  @Get('/by/:id')
  getImgById(@Param('id', ParseIntPipe) id: number) {
    return this.imgService.getImgById(id);
  }
  @Post('/')
  save(@Body() img: any) {
    return this.imgService.save(img);
  }
}
