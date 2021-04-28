import {User} from "./user-model";

export class SuggestFriend {
  private _suggestFriend: User;
  private _mutualFriends: User[];


  get suggestFriend(): User {
    return this._suggestFriend;
  }

  set suggestFriend(value: User) {
    this._suggestFriend = value;
  }

  get mutualFriends(): User[] {
    return this._mutualFriends;
  }

  set mutualFriends(value: User[]) {
    this._mutualFriends = value;
  }
}
