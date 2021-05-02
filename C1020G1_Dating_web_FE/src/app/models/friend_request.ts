import {User} from "./user-model";
;

export interface FriendRequest {
  friendRequestId?: number;
  sendUser: User;
  receiveUser: User;
  mutualFriends?: User[];
}
