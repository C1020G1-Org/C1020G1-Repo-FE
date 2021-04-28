import {Component, OnInit} from '@angular/core';
import {FriendService} from "../../services/friend.service";
import {SuggestFriend} from "../../model/SuggestFriend";
import {User} from "../../model/user";

@Component({
  selector: 'app-friend-suggest',
  templateUrl: './friend-suggest.component.html',
  styleUrls: ['./friend-suggest.component.css']
})
export class FriendSuggestComponent implements OnInit {

  mutualFriend: string;

  public suggestFriend: SuggestFriend[];

  constructor(
    private friendService: FriendService
  ) {
  }

  ngOnInit(): void {
    this.friendService.getAllFriendSuggest(1).subscribe(data => {
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
