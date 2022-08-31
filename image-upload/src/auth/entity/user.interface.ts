/* eslint-disable prettier/prettier */
import { Img } from '../../img/entity/img.entity';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  img: Img[];
}
