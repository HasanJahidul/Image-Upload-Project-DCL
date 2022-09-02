/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImgDto } from './dto/img.dto';
import { Img } from './entity/img.entity';
import * as fs from 'fs';
import * as https from 'https';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ImgService {
  constructor(@InjectRepository(Img) private imgRepository: Repository<Img>,
  private readonly httpService: HttpService,) {}

  //get all img
  async getImg(): Promise<Img[]> {
    // return await this.imgRepository.find();
    return await this.imgRepository.find({
      relations: ['user'],
    });
  }

  //save img
  save(imgDto: ImgDto) {
    // console.log(path, userId);

    // return path + userId;
    // return this.imgRepository.save(imgDto);
    const path = this.saveImageToServerExpress(imgDto.url);
    //inject imgDto to img entity
    // const img = new Img();
    // img.path = imgDto.url;
    // img.userId = imgDto.userId;
    // console.log(img);

    return path;
  }
  getImgById(id: number) {
    return this.imgRepository.find({ where: { userId: id } });
  }
  //Upload image to server with nest js
  async upload(@Res() res: Response,url) {
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
