import {Component, Injectable, OnInit} from '@angular/core';

import {map} from "rxjs/operators";
import {FriendRequestService} from "../../service/friends/friend-request.service";
import {NotificationService} from "../../service/friends/notification.service";
import {FriendRequest} from "../../models/friend_request";
import {Friends} from "../../models/friends";
import {User} from "../../models/user-model";
import Notification from "../../models/notification";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  constructor(private friendRequestService: FriendRequestService, private notificationService: NotificationService) {
  }

  listFriendRequest: FriendRequest[];

  friendRequestToDelete: FriendRequest;

  mutualFriend: string;

  notification: Notification;

  userLogin: User;

  checkLoadMore: boolean;

  numberSplice = 4;

  notiList: Notification[];

  ngOnInit(): void {


    this.findAllFriendRequest();



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
      this.notificationService.delete(10, this.notification.key)
    });
  }

  acceptFriendRequest(friendRequest: FriendRequest) {
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestService.acceptFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.notificationService.delete(10, this.notification.key)
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
    this.friendRequestService.findAllFriendRequest(this.userLogin.userId).subscribe(data => {
        this.friendRequestService.saveListFriendRequest(data);
        this.listFriendRequest = this.friendRequestService.getListFriendRequest(this.numberSplice);
        this.checkLoadMore = this.friendRequestService.getCheckLoadMore();
        this.friendRequestService.setCheckFriendRequest2True();
    });
  }



  loadMoreFriendRequest(){
    this.numberSplice += 4;
    this.listFriendRequest = this.friendRequestService.getListFriendRequest(this.numberSplice);
    this.checkLoadMore = this.friendRequestService.getCheckLoadMore();
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
}
