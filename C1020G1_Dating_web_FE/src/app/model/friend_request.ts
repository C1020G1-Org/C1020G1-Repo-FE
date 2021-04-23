import {User} from "./user";

export interface FriendRequest {
  idFriendRequest: number;
  sendUser: User;
  receiveUser: User;
}
