import {UserDto} from "../../dto/user-dto";

export class JwtResponse {

  token: string;
  user: UserDto;

  constructor(token: string) {
    this.token = token;
  }
}
