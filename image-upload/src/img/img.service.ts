import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Img } from './entity/img.entity';

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
  save(path: string) {
    console.log(path);

    return path;
  }
}
