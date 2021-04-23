import {StatusDto} from "./status-dto";
import {WardDto} from "./ward-dto";

export class UserDto {

  userId: number;

  userName: string;

  birthday: string;

  gender:string;

  occupation: string;

  email: string;

  userAvatar: string;

  userBackground: string;

  marriaged: string;

  ward: WardDto;

  address: String;

  status: StatusDto ;
}
