/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImgDto } from './dto/img.dto';
import { Img } from './entity/img.entity';
import * as fs from 'fs';
import * as https from 'https';
import { response } from 'express';

@Injectable()
export class ImgService {
  constructor(@InjectRepository(Img) private imgRepository: Repository<Img>) {}

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
  //save image to server with nest js
  saveImageToServer(url: string) {
    const dest = '../files/';
    const file = fs.createWriteStream(dest);
    const request = https
      .get(url, function (response: any) {
        response.pipe(file);
        file.on('finish', function () {
          file.close(); // close() is async, call cb after close completes.
        });
      })
      .on('error', function (err) {
        // Handle errors
        console.log(err);
      });
  }

  //Upload image to server with nest js
  saveImageToServerExpress(url: string) {
    const dest = '../files/';
    const file = fs.createWriteStream(dest);
    const request = https
      .get(url, function (response: any) {
        response.pipe(file);
        file.on('finish', function () {
          file.close(); // close() is async, call cb after close completes.
        });
      })
      .on('error', function (err) {
        // Handle errors
        console.log(err);
      });
    return request;
  }
}
