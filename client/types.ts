export interface IUser {
  id: number;
  email: string;
  name: string;
  img: IImg[];
}
export interface IImg {
  id: number;
  path: string;
  userID: number;
}
