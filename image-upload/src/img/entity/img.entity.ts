/* eslint-disable prettier/prettier */
import { User } from '../../auth/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Img {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  //hide this field
  @Column({ select: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.imgs, { onDelete: 'CASCADE' })
  @JoinTable()
  user: User;
}
