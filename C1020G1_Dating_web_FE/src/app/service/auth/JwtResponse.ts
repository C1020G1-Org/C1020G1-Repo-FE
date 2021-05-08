import {User} from "../../models/user-model";


export class JwtResponse {

  token: string;
  user: User;
  accountName: string

  constructor(token: string) {
    this.token = token;
  }
}
