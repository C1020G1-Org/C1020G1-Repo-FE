import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {TokenStorageService} from "../service/auth/token-storage";
import {User} from "../models/user-model";
import {map} from "rxjs/operators";
import {NotificationService} from "../service/friends/notification.service";
import {FriendRequest} from "../models/friend_request";
import {FriendService} from "../service/friends/friend.service";
import {FriendRequestService} from "../service/friends/friend-request.service";
import Notification from "../models/notification";
import {SearchingService} from "../service/searching/searching.service";
import NotificationGroup from "../models/groupNotification";
import {NotificationGroupService} from "../service/groups/group-notification.service";
import firebase from "firebase";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  userSendRequest: User;

  displayStatus: string;
  name: string;

  notiListFriend: Notification[];
  notiGroupList: NotificationGroup[] = [];

  lengthNoti: number;
  lengthNotiGroup:number;

  friendRequestHeader: FriendRequest;

  checkListNotiFriend: boolean;
  checkListNotiGroup: number;


  key: string;

  constructor(private searchingService: SearchingService,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private notificationService: NotificationService,
              private friendRequestService: FriendRequestService,
              private notificationGroupService: NotificationGroupService
  ) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    if (this.user.status.statusId == 1) {
      this.displayStatus = "status f-online"
    }
    if (this.user.status.statusId == 2) {
      this.displayStatus = "status f-away"
    }
    if (this.user.status.statusId == 3) {
      this.displayStatus = "status f-offline"
    }
    this.setNotiListFriend();
    this.setNotiGroupList();
  }


  logout() {
    this.tokenStorage.logOut();
    window.location.reload();
  }

  search(event: any) {
    this.searchingService.passKeySearch(event.target.value);
    if (this.router.url == '/name-search') {
    } else {
      this.router.navigateByUrl('/name-search');
    }
  }


  get userId(): number {
    return this.tokenStorage.getUser().userId;
  }

  setNotiListFriend() {
    this.notificationService.getAll(this.user.userId).snapshotChanges().pipe( // 5 is userId is logged
      map(changes =>
        changes.map(data => ({key: data.payload.key, ...data.payload.val()})
        )
      )
    ).subscribe(data => {
      this.notiListFriend = data;
      this.lengthNoti = this.notiListFriend.length;
      if (this.notiListFriend.length > 10){
        let number = this.notiListFriend.length - 10;
        this.notiListFriend.splice(0,number);
        this.checkListNotiFriend = true;
      } else if (this.notiListFriend.length == 0){
        this.checkListNotiFriend = false;
      } else {
        this.checkListNotiFriend = true;
      }
    });
  }


  sendIdFriendRequest(friendRequest: FriendRequest, key: string) {
    this.friendRequestHeader = friendRequest;
    this.key = key;
  }

  deleteFriendRequestInHeader() {
    this.friendRequestService.deleteFriendRequest
    (this.friendRequestHeader.receiveUser.userId, this.friendRequestHeader.sendUser.userId).subscribe();

    this.notificationService.delete(this.user.userId, this.key);

    this.friendRequestService.deleteFriendRequestFE(this.friendRequestHeader.sendUser.userId);
    this.friendRequestService.setCheckFriendRequest2True();
  }

  acceptFriendRequestInHeader(friendRequest: FriendRequest,key:string){

    friendRequest.sendUser.account = null;
    friendRequest.receiveUser.account = null;
    this.friendRequestService.acceptFriendRequest(friendRequest).subscribe(data => {
      this.userSendRequest = friendRequest.sendUser;

      this.notificationService.delete(this.user.userId,key);
      this.friendRequestService.deleteFriendRequestFE(friendRequest.sendUser.userId);
      const newRoom = firebase.database().ref('rooms/').push();
      const room = {roomname: ''};
      room.roomname =  this.userSendRequest.userName;
      newRoom.set(room);
      console.log("abc")
      this.createRoomFromLoginToWall(this.userSendRequest);
      this.createRoomFromWallToLogin(this.userSendRequest);
    })
  }


  /**
   * @author PhinNL
   * get all group notification by user logged
   */
  setNotiGroupList() {
    this.notificationGroupService.getAll(this.user.userId).snapshotChanges().pipe(
      map(changes =>
        changes.map(data => ({ key: data.payload.key, ...data.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notiGroupList = data;
      this.lengthNotiGroup = this.notiGroupList.length;
    });
  }

  /**
   * @author PhinNL
   * clear all group notification by user logged
   */
  deleteAllNotiGroup() {
    this.notificationGroupService.deleteAll(this.user.userId).then(() => console.log('delete all success!'));
  }
  /**
   * @author PhinNL
   * navigate to sender page
   */
  nav(groupId: number) {
    this.router.navigateByUrl('/group/details/'+groupId);
  }
  /**
   * @author PhinNL
   * clear one group notification by user logged
   */
  clearNotiGroup(key: string) {
    this.notificationGroupService.delete(key, this.user.userId).then(() => console.log('delete success!'));
  }

  createRoomFromLoginToWall(userSendRequest:User){
    console.log(userSendRequest);
    const roomuser = firebase.database().ref('roomusers/').push();
    const newroomuser1 = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: '',getroom: ''};
    newroomuser1.roomname = userSendRequest.userName  + this.user.userName;
    newroomuser1.nickname = this.user.userName;
    newroomuser1.id = this.user.userId.toString();
    newroomuser1.status = this.user.status.statusName;
    newroomuser1.avatar = userSendRequest.userAvatar;
    newroomuser1.nickNameFriend = userSendRequest.userName;
    newroomuser1.getroom = userSendRequest.userName;
    roomuser.set(newroomuser1);
  }

  createRoomFromWallToLogin(userSendRequest:User){
    console.log(userSendRequest);
    const roomuser = firebase.database().ref('roomusers/').push();
    const newroomuser2 = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: '',getroom: ''};
    newroomuser2.roomname =  userSendRequest.userName + this.user.userName;
    newroomuser2.nickname = userSendRequest.userName;
    newroomuser2.id = userSendRequest.userId.toString();
    newroomuser2.status = userSendRequest.status.statusName;
    newroomuser2.avatar = this.user.userAvatar;
    newroomuser2.nickNameFriend = this.user.userName;
    newroomuser2.getroom = this.user.userName;
    roomuser.set(newroomuser2);
  }
}
