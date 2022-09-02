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
  @Get('/down')
  async downloadImage(@Res() res: Response) {
    const filename= Date.now() + '.jpg';
    const path = __dirname + '/../files/' +filename;
    const writer = fs.createWriteStream(path);

    const response = await this.httpService.axiosRef({
      url: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/285676319_102906439119720_5903617344568960875_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3cHm9bHYPBoAX_pqXlv&_nc_ht=scontent.fdac138-1.fna&oh=00_AT-g-F88N2d06n4DD6czhe1hmgSjq3zk9eRiOWT18sRXOQ&oe=6316B187',
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);
    return res.json(filename);
  }
}
