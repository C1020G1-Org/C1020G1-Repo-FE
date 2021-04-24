import { Component, OnInit } from '@angular/core';
import {FriendService} from "../friend.service";
import {Friends} from "../Friends";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  public friends: Friends[];
  friendsId: number;
  friendName: string;


  constructor(
    private friendService: FriendService
  ) { }

  ngOnInit(): void {
    this.friendService.getAllFriend(1).subscribe(data => {
      this.friends = data;
      console.log(this.friends)
    })
  }

  showDelete(id: number, userName: string) {
    this.friendsId = id;
    this.friendName = userName;
    console.log(this.friendsId, this.friendName)
  }

  delete() {
    this.friendService.deleteFriend(this.friendsId).subscribe(data => {
        this.ngOnInit();
    })
  }
}
