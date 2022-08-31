/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Img } from '../../img/entity/img.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  //one user has many images
  @OneToOne(() => Img, (img) => img.user, { cascade: true })
  img: Img[];

  addImg(img: Img) {
    if (this.img === null) {
      this.img = new Array<Img>();
    }
    this.img.push(img);
  }
}
