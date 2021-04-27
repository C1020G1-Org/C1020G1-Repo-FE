import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../services/friend.service";
import {Friends} from "../../model/Friends";


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  public friends: Friends[];
  friendId: number;
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
    this.friendId = id;
    this.friendName = userName;
    console.log(this.friendId, this.friendName)
  }

  delete() {
    this.friendService.deleteFriend(this.friendId).subscribe(data => {
        this.ngOnInit();
    })
  }
}
