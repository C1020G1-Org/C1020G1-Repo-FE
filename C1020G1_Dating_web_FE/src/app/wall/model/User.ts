import {Ward} from "./Ward";

export interface User {
  userId: number ;
  userName: string;
  birthday: string;
  gender: string;
  occupation: string;
  email: string;
  userAvatar: string;
  userBackground: string;
  marriaged: string;
  ward: Ward;
}
