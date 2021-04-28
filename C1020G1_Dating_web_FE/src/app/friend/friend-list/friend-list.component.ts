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
  public pageNumber = 0;
  public checkLoadMore: boolean;
  public check: boolean;


  constructor(
    private friendService: FriendService
  ) { }

  getAllFriend(){
    this.friendService.getAllFriend(1, this.pageNumber).subscribe(data => {
      console.log(data);
      let listFriends = data.content;
      if(this.friends != null){
        this.friends = this.friends.concat(listFriends);
        this.checkLoadMore = false;
      }else {
        this.friends = listFriends;
        this.checkLoadMore = true;
      }
    })
  }

  ngOnInit(): void {
    this.getAllFriend();
  }

  showDelete(id: number, userName: string) {
    this.friendId = id;
    this.friendName = userName;
    console.log(this.friendId, this.friendName)
  }

  delete() {
    this.friendService.deleteFriend(this.friendId).subscribe(data => {
      console.log('kkk');
      window.location.reload();
    })
  }

  loadMoreFriend() {
    this.pageNumber++;
    this.getAllFriend();
  }
}
