import {User} from "../../user-management/model/user-model";


export class JwtResponse {

  token: string;
  user: User;
  accountName: string

  constructor(token: string) {
    this.token = token;
  }
}
