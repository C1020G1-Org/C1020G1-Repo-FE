import {User} from "./User";

export class Friends {
  friendsId: number;
  user: User;
  friend: User;

  constructor(friendsId: number, user: User, friend: User) {
    this.friendsId = friendsId;
    this.user = user;
    this.friend = friend;
  }
}
