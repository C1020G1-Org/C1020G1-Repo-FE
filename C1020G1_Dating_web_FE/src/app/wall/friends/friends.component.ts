import {Component, OnInit} from '@angular/core';
import {Friends} from "../../models/friends";
import {FriendService} from "../../service/friends/friend.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-friend-list',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public friends: Friends[];
  friendId: number;
  friendName: string;
  public pageNumber = 0;
  public checkLoadMore: boolean;
  public check: boolean;


  constructor(
    private friendService: FriendService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  id: number;

  ngOnInit(): void {
    this.getAllFriend();
    this.id = this.activatedRoute.snapshot.params['id'];

    console.log(this.id);
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

  getAllFriend() {
    this.friendService.getAllFriend(2, this.pageNumber).subscribe(data => {
      console.log(data);
      let listFriends = data.content;
      if (this.friends != null) {
        this.friends = this.friends.concat(listFriends);
        this.checkLoadMore = false;
      } else {
        this.friends = listFriends;
        this.checkLoadMore = true;
      }
    })
  }
}
