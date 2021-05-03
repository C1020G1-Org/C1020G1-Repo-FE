import { Component, OnInit } from '@angular/core';


import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../service/auth/token-storage";
import {User} from "../../models/user-model";
import {FriendRequestService} from "../../service/friends/friend-request.service";
import {Friends} from "../../models/friends";
import {FriendRequest} from "../../models/friend_request";
import Notification from "../../models/notification";
import {NotificationService} from "../../service/friends/notification.service";
import {map} from "rxjs/operators";
import {UserServiceService} from "../../service/user-service.service";
import {Post} from "../../models/Post";
import firebase from "firebase";

@Component({
  selector: 'app-topwall',
  templateUrl: './topwall.component.html',
  styleUrls: ['./topwall.component.css']
})
export class TopwallComponent implements OnInit {
  userWall: User;

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

  isDisplayPost: boolean;


  constructor(
    public userService : UserServiceService ,
    private activatedRoute: ActivatedRoute,
    private tokenStorage:TokenStorageService,
    private friendRequestService: FriendRequestService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userLogging = this.tokenStorage.getUser();


    this.id = this.activatedRoute.snapshot.params['id'];


    this.userService.findUserById(this.id).subscribe(data => {
      this.userWall = data;
      this.checkFriendUserWall();
      this.findAllFriendRequest();
      this.checkFriendRequestUserWall();
    });

    this.setNotiList();
    let splitURL = this.router.url.split("/");
    this.isDisplayPost = splitURL.length <= 4;
  }

  unFriend() {
    this.friendRequestService.unFriend(this.friends.friendsId).subscribe(data => this.ngOnInit());
    this.checkFriend = true;
  }

  //Check friend between user login and user wall
  checkFriendUserWall() {

    this.friendRequestService.getAllFriendOfUser(this.userWall.userId).subscribe(data => {
      if (data != null) {
        let friends: Friends[] = data;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].friend.userId == this.userLogging.userId) {
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
    this.friendRequestService.findAllFriendRequest(this.userWall.userId).subscribe(data => {
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
      receiveUser: this.userWall
    };
    this.friendRequestService.createFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.noti(friendRequest);
    });
  }

  noti(friendRequest: FriendRequest) {
    let notification = new Notification();
    notification.friendRequest = friendRequest;
    this.notificationService.create(notification, this.userWall.userId);
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
    friendRequest.sendUser.account = null;
    friendRequest.receiveUser.account = null;
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestService.acceptFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.notificationService.delete(this.userLogging.userId, this.notification.key);
      const newRoom = firebase.database().ref('rooms/').push();
      const room = {roomname: ''};
      room.roomname =  this.userWall.userName;
      newRoom.set(room);

      this.createRoomFromLoginToWall();
      this.createRoomFromWallToLogin();
    });
  }

  //Get list friend request of User login and chẹck list friend request with wallUser.
  findAllFriendRequest() {
    this.friendRequestService.findAllFriendRequest(this.userLogging.userId).subscribe(data => {
        let listFriendRequest: FriendRequest[] = data;
        for (let i = 0; i < listFriendRequest.length; i++) {
          if (listFriendRequest[i].sendUser.userId == this.userWall.userId) {
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
      this.notificationService.delete(this.userLogging.userId, this.notification.key)
    });
  }

  sendFriendRequestToDelete(friendRequest: FriendRequest) {
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestToDelete = friendRequest;
  }

  setIsDisplay() {
    this.isDisplayPost = false;
  }

  createRoomFromLoginToWall(){
    const roomuser = firebase.database().ref('roomusers/').push();
    const newroomuser1 = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: '',getroom: ''};
    newroomuser1.roomname = this.userWall.userName  + this.userLogging.userName;
    newroomuser1.nickname = this.userLogging.userName;
    newroomuser1.id = this.userLogging.userId.toString();
    newroomuser1.status = this.userLogging.status.statusName;
    newroomuser1.avatar = this.userWall.userAvatar;
    newroomuser1.nickNameFriend = this.userWall.userName;
    newroomuser1.getroom = this.userWall.userName;
    roomuser.set(newroomuser1);
  }

  createRoomFromWallToLogin(){
    const roomuser = firebase.database().ref('roomusers/').push();
    const newroomuser2 = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: '',getroom: ''};
    newroomuser2.roomname =  this.userWall.userName + this.userLogging.userName;
    newroomuser2.nickname = this.userWall.userName;
    newroomuser2.id = this.userWall.userId.toString();
    newroomuser2.status = this.userWall.status.statusName;
    newroomuser2.avatar = this.userLogging.userAvatar;
    newroomuser2.nickNameFriend = this.userLogging.userName;
    newroomuser2.getroom = this.userLogging.userName;
    roomuser.set(newroomuser2);
  }

  logout() {
    this.tokenStorage.logOut();
    window.location.reload();
  }
}
