/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsString, IsUrl } from 'class-validator';

export class ImgDto {
  @IsUrl()
  url: string;
  @IsNumber()
  userId: number;
}
