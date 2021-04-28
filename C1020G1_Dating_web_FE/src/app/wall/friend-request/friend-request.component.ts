import {Component, Injectable, OnInit} from '@angular/core';
import {FriendRequest} from "../../model/friend_request";
import {Account} from "../../model/account";
import {Status} from "../../model/status";
import {Province} from "../../model/province";
import {District} from "../../model/district";
import {Ward} from "../../model/ward";
import {User} from "../../model/user";
import {Friends} from "../../model/friends";
import Notification from "../../model/notification"
import {NotificationService} from "../../services/notification.service";
import {FriendRequestService} from "../../services/friend-request.service";
import {map} from "rxjs/operators";

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

  friends: Friends;

  checkFriend: boolean = true;

  checkFriendRequest: boolean = true;

  checkFriendRequest2: boolean;

  friendRequestWallUserAndLoginUser: FriendRequest;

  mutualFriend: string;

  notiList: Notification[];

  notification: Notification;

  status: Status;

  account: Account;

  province: Province;

  district: District;

  ward: Ward;

  userLogin: User;

  userWall: User;

  checkLoadMore: boolean;

  numberSplice = 8;

  ngOnInit(): void {

    this.setNotiList();
    this.status = {
      statusId: 1,
      statusName: "Online"
    };

    this.account = {
      accountId: 1,
      accountName: "abc",
      password: "abc"
    };


    this.province = {
      provinceId: 1,
      provinceName: "Đà Nẵng"
    };


    this.district = {
      districtId: 1,
      districtName: "Hải Châu",
      province: this.province
    };

    this.ward = {
      wardId: 1,
      wardName: "Đống Đa",
      district: this.district
    };

    this.userLogin = {
      userId: 10,
      userName: "Tùng 9",
      birthday: "1995-11-24",
      gender: "Nam",
      occupation: "Abc",
      address: "Đà Nẵng",
      email: "abc@gmail.com",
      userAvatar: "https://www.w3schools.com/w3images/avatar2.png",
      userBackground: "link",
      marriaged: "Yes",
      status: this.status,
      account: this.account,
      ward: this.ward,
    };

    this.userWall = {
      userId: 10,
      userName: "Tùng 9",
      birthday: "1995-11-24",
      gender: "Nam",
      occupation: "Abc",
      address: "Đà Nẵng",
      email: "abc@gmail.com",
      userAvatar: "https://www.w3schools.com/w3images/avatar2.png",
      userBackground: "link",
      marriaged: "Yes",
      status: this.status,
      account: this.account,
      ward: this.ward,
    };


    this.findAllFriendRequest();

    this.checkFriendRequestUserWall();

    this.checkFriendUserWall();
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
    this.checkFriendRequest = true;
    this.checkFriendRequest2 = true;
    this.notification = this.friendRequestService.findNotifyByFriendRequest(this.notiList, friendRequest);
    this.friendRequestService.acceptFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.notificationService.delete(10, this.notification.key)
    });
  }

  createFriendRequest() {
    let friendRequest: FriendRequest = {
      sendUser: this.userLogin,
      receiveUser: this.userWall
    };
    this.friendRequestService.createFriendRequest(friendRequest).subscribe(data => {
      this.ngOnInit();
      this.noti(friendRequest);
    });
  }

  unFriend() {
    this.friendRequestService.unFriend(this.friends.friendsId).subscribe(data => this.ngOnInit());
    this.checkFriend = true;
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

  //Get list friend request of User login and chẹck list friend request with wallUser.
  findAllFriendRequest() {
    this.friendRequestService.findAllFriendRequest(this.userLogin.userId).subscribe(data => {
      if (data != null) {
        let listFriendRequest: FriendRequest[] = data;
        for (let i = 0; i < listFriendRequest.length; i++) {
          if (listFriendRequest[i].sendUser.userId == this.userWall.userId) {
            this.checkFriendRequest = false;
            this.friendRequestWallUserAndLoginUser = listFriendRequest[i];
            break;
          }
        }
        this.friendRequestService.saveListFriendRequest(listFriendRequest);
        this.listFriendRequest = this.friendRequestService.getListFriendRequest(this.numberSplice);
        this.checkLoadMore = this.friendRequestService.getCheckLoadMore();
        this.friendRequestService.setCheckFriendRequest2True();
      }
    });
  }

  //Check list friend request between user login and user wall.
  checkFriendRequestUserWall() {
    this.friendRequestService.findAllFriendRequest(this.userWall.userId).subscribe(data => {
      if (data != null) {
        let listFriendRequest: FriendRequest[] = data;
        for (let i = 0; i < listFriendRequest.length; i++) {
          if (listFriendRequest[i].sendUser.userId == this.userLogin.userId) {
            this.friendRequestService.setCheckFriendRequest2False();
            this.friendRequestWallUserAndLoginUser = listFriendRequest[i];
            break;
          }
        }
      }
      this.checkFriendRequest2 = this.friendRequestService.getCheckFriendRequest2();
    });
  }

  checkFriendUserWall() {

    //Check friend between user login and user wall
    this.friendRequestService.getAllFriendOfUser(this.userLogin.userId).subscribe(data => {
      if (data != null) {
        let friends: Friends[] = data;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].friend.userId == this.userWall.userId) {
            this.friends = friends[i];
            this.checkFriend = false;
            break;
          }
        }
      }
    });
  }

  loadMoreFriendRequest(){
    this.numberSplice += 8;
    this.listFriendRequest = this.friendRequestService.getListFriendRequest(this.numberSplice);
    this.checkLoadMore = this.friendRequestService.getCheckLoadMore();
  }
}
