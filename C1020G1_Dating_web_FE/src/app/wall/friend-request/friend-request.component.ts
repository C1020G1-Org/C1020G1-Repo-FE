import {Component, Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {map} from "rxjs/operators";
import {FriendRequestService} from "../../service/friends/friend-request.service";
import {NotificationService} from "../../service/friends/notification.service";
import {FriendRequest} from "../../models/friend_request";
import {User} from "../../models/user-model";
import Notification from "../../models/notification";
import {TokenStorageService} from "../../service/auth/token-storage";
import {ActivatedRoute} from "@angular/router";
import {UserServiceService} from "../../service/user-service.service";
import {UserService} from "../service/user.service";
import firebase from "firebase";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit{

  constructor(private friendRequestService: FriendRequestService,
              private notificationService: NotificationService,
              private tokenStorage:TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private userService: UserServiceService) {
  }

  listFriendRequest: FriendRequest[];

  lengthListFriendRequest: number;

  friendRequestToDelete: FriendRequest;

  mutualFriend: string;

  notification: Notification;

  userLogging: User;

  checkLoadMore: boolean;

  numberSplice = 4;

  notiList: Notification[];

  checkPrivacy: boolean;

  userWall: User;

  ngOnInit(): void {



    this.userLogging = this.tokenStorage.getUser();

    this.setNotiList();

    this.findAllFriendRequest();

    let id = this.activatedRoute.snapshot.params["id"];

    if (id != this.userLogging.userId){
      this.checkPrivacy = false;
    } else {
      this.checkPrivacy = true;
    }
  }


  sendFriendRequestToDelete(friendRequest: FriendRequest) {
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestToDelete = friendRequest;
  }

  deleteFriendRequest() {
    this.friendRequestService.setCheckFriendRequest2True();
    this.friendRequestService.deleteFriendRequest(
      this.friendRequestToDelete.receiveUser.userId,
      this.friendRequestToDelete.sendUser.userId).subscribe(data => {
      this.ngOnInit();
      this.notificationService.delete(this.userLogging.userId, this.notification.key)
    });
  }

  acceptFriendRequest(friendRequest: FriendRequest) {
    this.userWall = friendRequest.sendUser;
    friendRequest.sendUser.account = null;
    friendRequest.receiveUser.account = null;
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestService.acceptFriendRequest(friendRequest).subscribe(data => {

      this.notificationService.delete(this.userLogging.userId, this.notification.key);
      const newRoom = firebase.database().ref('rooms/').push();
      const room = {roomname: ''};
      room.roomname =  this.userWall.userName;
      newRoom.set(room);

      this.createRoomFromLoginToWall();
      this.createRoomFromWallToLogin();
      this.ngOnInit();
    });
  }


  getMutualFriend(mutualFriend: User[]) {
    this.mutualFriend = '';
    for (let i = 0; i < mutualFriend.length; i++) {
      if (i < 10) {
        this.mutualFriend += mutualFriend[i].userName + "<br>";
      } else {
        this.mutualFriend += "and more" + (mutualFriend.length - i) + "people";
        break;
      }
    }
  }


  //Get list friend request of User login and chẹck list friend request with wallUser.
  findAllFriendRequest() {
    this.friendRequestService.findAllFriendRequest(this.userLogging.userId).subscribe(data => {
      if (data != null) {
        this.friendRequestService.saveListFriendRequest(data);
        this.listFriendRequest = this.friendRequestService.getListFriendRequest(this.numberSplice);
        this.checkLoadMore = this.friendRequestService.getCheckLoadMore();
        this.friendRequestService.setCheckFriendRequest2True();
        this.lengthListFriendRequest = data.length;
      }else {
        this.lengthListFriendRequest = 0;
      }
    });
  }



  loadMoreFriendRequest(){
    this.numberSplice += 4;
    this.listFriendRequest = this.friendRequestService.getListFriendRequest(this.numberSplice);
    this.checkLoadMore = this.friendRequestService.getCheckLoadMore();
  }

  setNotiList() {
    this.notificationService.getAll(this.userLogging.userId).snapshotChanges().pipe( // 5 is userId is logged
      map(changes =>
        changes.map(data => ({key: data.payload.key, ...data.payload.val()})
        )
      )
    ).subscribe(data => {
      this.notiList = data;
    });
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
}
