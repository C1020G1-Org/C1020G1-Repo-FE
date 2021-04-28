import { Component, OnInit } from '@angular/core';


import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../service/auth/token-storage";
import {User} from "../../models/user-model";
import {FriendRequestService} from "../../service/friends/friend-request.service";
import {Friends} from "../../models/friends";
import {FriendRequest} from "../../models/friend_request";
import Notification from "../../models/notification";
import {NotificationService} from "../../service/friends/notification.service";
import {map} from "rxjs/operators";
import {UserServiceService} from "../../service/user-service.service";

@Component({
  selector: 'app-topwall',
  templateUrl: './topwall.component.html',
  styleUrls: ['./topwall.component.css']
})
export class TopwallComponent implements OnInit {
  public userInfo: User;

  id: number;

  userLogging: User;

  notiList: Notification[];

  friends: Friends;

  checkFriend: boolean = true;

  checkFriendRequest2: boolean;

  friendRequestWallUserAndLoginUser: FriendRequest;

  checkFriendRequest: boolean = true;

  notification: Notification;

  friendRequestToDelete: FriendRequest;



  constructor(
    public userService : UserServiceService ,
    private activatedRoute: ActivatedRoute,
    private tokenStorage:TokenStorageService,
    private friendRequestService: FriendRequestService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {



    this.userLogging = this.tokenStorage.getUser();


    this.id = this.activatedRoute.snapshot.params['id'];


    this.userService.findUserById(this.id).subscribe(data => {
      this.userInfo = data;
      this.checkFriendUserWall();
      this.findAllFriendRequest();

      this.checkFriendRequestUserWall();

      console.log(this.checkFriend);
      console.log(this.checkFriendRequest);
      console.log(this.checkFriendRequest2);
      // console.log(this.userInfo);
    });

    this.setNotiList();




  }

  unFriend() {
    this.friendRequestService.unFriend(this.friends.friendsId).subscribe(data => this.ngOnInit());
    this.checkFriend = true;
  }

  //Check friend between user login and user wall
  checkFriendUserWall() {
    console.log(this.userInfo);
    this.friendRequestService.getAllFriendOfUser(this.userInfo.userId).subscribe(data => {
      if (data != null) {
        let friends: Friends[] = data;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].friend.userId == this.userInfo.userId) {
            this.friends = friends[i];
            this.checkFriend = false;
            break;
          }
        }
      }
    });
  }

  //Check list friend request between user login and user wall.
  checkFriendRequestUserWall() {
    this.friendRequestService.findAllFriendRequest(this.userInfo.userId).subscribe(data => {
      if (data != null) {
        let listFriendRequest: FriendRequest[] = data;
        for (let i = 0; i < listFriendRequest.length; i++) {
          if (listFriendRequest[i].sendUser.userId == this.userLogging.userId) {
            this.friendRequestService.setCheckFriendRequest2False();
            this.friendRequestWallUserAndLoginUser = listFriendRequest[i];
            break;
          }
        }
      }
      this.checkFriendRequest2 = this.friendRequestService.getCheckFriendRequest2();
    });
  }

  createFriendRequest() {
    let friendRequest: FriendRequest = {
      sendUser: this.userLogging,
      receiveUser: this.userInfo
    };
    this.friendRequestService.createFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.noti(friendRequest);
    });
  }

  noti(friendRequest: FriendRequest) {
    let notification = new Notification();
    notification.friendRequest = friendRequest;
    this.notificationService.create(notification, this.userInfo.userId);
  }

  setNotiList() {
    this.notificationService.getAll(10).snapshotChanges().pipe( // 5 is userId is logged
      map(changes =>
        changes.map(data => ({key: data.payload.key, ...data.payload.val()})
        )
      )
    ).subscribe(data => {
      this.notiList = data;
    });
  }

  acceptFriendRequest(friendRequest: FriendRequest) {
    this.checkFriendRequest = true;
    this.checkFriendRequest2 = true;
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestService.acceptFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.notificationService.delete(10, this.notification.key)
    });
  }

  //Get list friend request of User login and chẹck list friend request with wallUser.
  findAllFriendRequest() {
    this.friendRequestService.findAllFriendRequest(this.userLogging.userId).subscribe(data => {
        let listFriendRequest: FriendRequest[] = data;
        for (let i = 0; i < listFriendRequest.length; i++) {
          if (listFriendRequest[i].sendUser.userId == this.userInfo.userId) {
            this.checkFriendRequest = false;
            this.friendRequestWallUserAndLoginUser = listFriendRequest[i];
            break;
          }
        }
        this.friendRequestService.setCheckFriendRequest2True();
    });
  }

  deleteFriendRequestTopWall() {
    this.friendRequestService.setCheckFriendRequest2True();
    this.friendRequestService.deleteFriendRequest(
      this.friendRequestToDelete.receiveUser.userId,
      this.friendRequestToDelete.sendUser.userId).subscribe(data => {
      this.ngOnInit();
      this.notificationService.delete(10, this.notification.key)
    });
  }

  sendFriendRequestToDelete(friendRequest: FriendRequest) {
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestToDelete = friendRequest;
  }
}
