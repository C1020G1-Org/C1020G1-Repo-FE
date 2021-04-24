import { Component, OnInit } from '@angular/core';
import {SuggestFriend} from "../SuggestFriend";
import {FriendService} from "../friend.service";

@Component({
  selector: 'app-friend-suggest',
  templateUrl: './friend-suggest.component.html',
  styleUrls: ['./friend-suggest.component.css']
})
export class FriendSuggestComponent implements OnInit {

  public suggestFriend: SuggestFriend[];
  constructor(
    private friendService: FriendService
  ) { }

  ngOnInit(): void {
    this.friendService.getAllFriendSuggest(1).subscribe(data =>{
      this.suggestFriend = data;
      console.log(this.suggestFriend);
    })
  }

}
