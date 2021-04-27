import {Status} from "./status";
import {Ward} from "./ward";
import {Account} from "./account";

export interface User {
  userId: number;
  userName: string;
  birthday: string;
  gender: string;
  occupation: string;
  address: string;
  email: string;
  userAvatar: string;
  userBackground: string;
  marriaged: string;
  status: Status;
  account: Account;
  ward: Ward;
}
