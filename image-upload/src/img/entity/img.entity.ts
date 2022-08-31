/* eslint-disable prettier/prettier */
import { User } from '../../auth/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Img {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;
  @Column()
  userId: string;

  // @ManyToOne(() => User, (user) => user.img)
  // user: User;
}
