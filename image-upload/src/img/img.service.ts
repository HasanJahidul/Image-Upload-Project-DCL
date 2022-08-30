import { Injectable } from '@nestjs/common';

@Injectable()
export class ImgService {
  save(img: any): string {
    return img;
  }
  //getimg by userid
  getImg(userid: number): string {
    return 'getImg' + userid;
  }
  //getimg by id
  getImgById(id: number): number {
    return id;
  }
}
