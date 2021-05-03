import {Component, OnInit} from '@angular/core';
import {Friends} from "../../models/friends";
import {FriendService} from "../../service/friends/friend.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../service/auth/token-storage";
import {User} from "../../models/user-model";
import {UserServiceService} from "../../service/user-service.service";


@Component({
  selector: 'app-friend-list',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: Friends[];
  friendId: number;
  friendName: string;
  pageNumber = 0;
  checkLoadMore: boolean;
  check: boolean;

  userLogging: User;

  userWall: User;


  constructor(
    private friendService: FriendService,
    private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userService: UserServiceService
  ) {
  }


  ngOnInit(): void {

    this.userLogging = this.tokenStorage.getUser();

    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.findUserById(id).subscribe(data => {
      this.userWall = data;
      this.getAllFriend(false);
    });

  }

  showDelete(id: number, userName: string) {
    this.friendId = id;
    this.friendName = userName;
  }

  delete() {
    this.friendService.deleteFriend(this.friendId).subscribe(data => {
      window.location.reload();
    })
  }

  loadMoreFriend() {
    this.pageNumber++;
    this.getAllFriend(true);

  }

  getAllFriend(checkLoadMore) {
    this.friendService.getAllFriend(this.userWall.userId, this.pageNumber).subscribe(data => {
      if (data.content == null) {
        this.checkLoadMore = false;
        return;
      }
      if (!checkLoadMore) {
        if (this.friends == null) {
          this.friends = data.content
          this.checkLoadMore = data.content.length >= 4;
          return;
        }
      } else {
        if (data.content.length < 4) {
          this.friends = this.friends.concat(data.content)
          this.checkLoadMore = false
        } else {
          this.friends = this.friends.concat(data.content)
          this.checkLoadMore = true
        }
      }
    })
  }
}
