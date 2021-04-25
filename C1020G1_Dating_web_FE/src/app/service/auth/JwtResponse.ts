import {UserDto} from "../../dto/user-dto";

export class JwtResponse {

  token: string;
  user: UserDto;
  accountName: string

  constructor(token: string) {
    this.token = token;
  }
}
