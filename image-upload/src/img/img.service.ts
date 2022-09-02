/* eslint-disable prettier/prettier */
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
  constructor(
    @InjectRepository(Img) private imgRepository: Repository<Img>,
    private readonly httpService: HttpService,
  ) {}

  //get all img
  async getImg(): Promise<Img[]> {
    // return await this.imgRepository.find();
    return await this.imgRepository.find({
      relations: ['user'],
    });
  }

  //save img
  async save(imgDto: ImgDto) {
    const filename = await this.upload(imgDto.url);
    console.log('file' + JSON.stringify(filename));

    const img = new Img();
    img.path = filename.toString();
    console.log('Path' + img.path);
    img.userId = imgDto.userId;
    return await this.imgRepository.save(img);
  }
  getImgById(id: number) {
    return this.imgRepository.find({ where: { userId: id } });
  }
  //Upload image to server with nest js
  async upload(url: string) {
    const filename = Date.now() + '.jpg';
    const path = __dirname + '/../files/' + filename;
    console.log('path' + path);

    const dir = __dirname + '/../files/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const writer = fs.createWriteStream(path);

    const response = await this.httpService.axiosRef({
      url: url,
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(writer);

    // response.data.pipe(writer);
    return filename;
  }
}
