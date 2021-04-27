import {User} from "./user";

export interface FriendRequest {
  friendRequestId?: number;
  sendUser: User;
  receiveUser: User;
  mutualFriends?: User[];
}
