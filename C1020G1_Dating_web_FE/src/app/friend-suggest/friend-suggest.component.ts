import {Component, OnInit} from '@angular/core';
import {SuggestFriend} from "../models/SuggestFriend";
import {FriendService} from "../service/friends/friend.service";
import {User} from "../models/user-model";
import {TokenStorageService} from "../service/auth/token-storage";


@Component({
  selector: 'app-friend-suggest',
  templateUrl: './friend-suggest.component.html',
  styleUrls: ['./friend-suggest.component.css']
})
export class FriendSuggestComponent implements OnInit {

  mutualFriend: string;

  public suggestFriend: SuggestFriend[];

  constructor(
    private friendService: FriendService,
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.friendService.getAllFriendSuggest(this.tokenStorage.getUser().userId).subscribe(data => {
      console.log(data);
      this.suggestFriend = data;
      console.log(this.suggestFriend);
    })
  }

  getMutualFriend(mutualFriends: User[]) {
    this.mutualFriend = "";
    for (let i = 0; i < mutualFriends.length; i++) {
      if (i < 10) {
        this.mutualFriend += mutualFriends[i].userName + "<br>"
      } else {
        this.mutualFriend += "end more" + (mutualFriends.length - 1) + "people";
        break;
      }
    }
  }
}
