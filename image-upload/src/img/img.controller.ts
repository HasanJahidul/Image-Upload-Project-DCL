import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { Request } from 'express';
import { ImgDto } from './dto/img.dto';
import { Img } from './entity/img.entity';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';

@Controller('img')
export class ImgController {
  constructor(
    private imgService: ImgService,
    private readonly httpService: HttpService,
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

  @Get('/download')
  async downloadImage(@Res() res) {
    const writer = fs.createWriteStream('../files/image.png');

    const response = await this.httpService.axiosRef({
      url: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2022/02/20/3080776-16902935.jpg?itok=PzcjJlM1',
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
}
