import {Component, Injectable, OnInit} from '@angular/core';
import {FriendRequest} from "../../model/friend_request";
import {WallService} from "../wall.service";
import {Account} from "../../model/account";
import {Status} from "../../model/status";
import {Province} from "../../model/province";
import {District} from "../../model/district";
import {Ward} from "../../model/ward";
import {User} from "../../model/user";
import {Friends} from "../../model/friends";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  constructor(private wallService: WallService) {
  }

  listFriendRequest: FriendRequest[];

  userWall: User;

  userLogin: User;

  idFriendRequest: number;

  friends: Friends;

  checkFriend: boolean = true;

  checkFriendRequest: boolean = true;

  checkFriendRequest2: boolean = true;

  friendRequestWallUserAndLoginUser: FriendRequest;

  mutualFriend: string;

  ngOnInit(): void {

    let status: Status;
    status = {
      statusId: 1,
      statusName: "Online"
    };

    let account: Account;
    account = {
      accountId: 1,
      accountName: "abc",
      password: "abc"
    };

    let province: Province;
    province = {
      provinceId: 1,
      provinceName: "Đà Nẵng"
    };

    let district: District;
    district = {
      districtId: 1,
      districtName: "Hải Châu",
      province: province
    };

    let ward: Ward;
    ward = {
      wardId: 1,
      wardName: "Đống Đa",
      district: district
    };

    let userLogin: User;
    userLogin = {
      userId: 4,
      userName: "Tùng 2",
      birthday: "1995-11-24",
      gender: "Nam",
      occupation: "Abc",
      address: "Đà Nẵng",
      email: "abc@gmail.com",
      userAvatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png",
      userBackground: "link",
      marriaged: "Yes",
      status: status,
      account: account,
      ward: ward,
    };

    let userWall: User;
    userWall = {
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
      status: status,
      account: account,
      ward: ward,
    };
    this.userWall = userWall;
    this.userLogin = userLogin;

    //Get list friend request of User login and chẹck list friend request with wallUser.
    this.wallService.findAllFriendRequest(userLogin.userId).subscribe(data => {
      if (data != null) {
        let listFriendRequest: FriendRequest[] = data;
        for (let i = 0; i < listFriendRequest.length; i++) {
          if (listFriendRequest[i].sendUser.userId == this.userWall.userId) {
            this.checkFriendRequest = false;
            this.friendRequestWallUserAndLoginUser = listFriendRequest[i];
            break;
          }
        }
        this.listFriendRequest = data;
      }
    });

    //Check list friend request between user login and user wall.
    this.wallService.findAllFriendRequest(userWall.userId).subscribe(data => {
      if (data != null) {
        let listFriendRequest: FriendRequest[] = data;
        for (let i = 0; i < listFriendRequest.length; i++) {
          if (listFriendRequest[i].sendUser.userId == this.userLogin.userId) {
            this.checkFriendRequest2 = false;
            this.friendRequestWallUserAndLoginUser = listFriendRequest[i];
            break;
          }
        }
      }
    });

    //Check friend between user login and user wall
    this.wallService.getAllFriendOfUser(userLogin.userId).subscribe(data => {
      if(data != null) {
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

  sendIdRequest(idFriendRequest: number) {
    this.idFriendRequest = idFriendRequest;
  }

  deleteFriendRequest() {
    this.checkFriendRequest2 = true;
    this.wallService.deleteFriendRequest(this.idFriendRequest).subscribe(data => this.ngOnInit());
  }

  acceptFriendRequest(friendRequest: FriendRequest) {
    this.checkFriendRequest = true;
    this.wallService.acceptFriendRequest(friendRequest).subscribe(data => this.ngOnInit());
  }

  createFriendRequest() {
    let friendRequest: FriendRequest = {
      sendUser: this.userLogin,
      receiveUser: this.userWall
    };
    this.wallService.createFriendRequest(friendRequest).subscribe(data => this.ngOnInit());
  }

  unFriend() {
    this.wallService.unFriend(this.friends.friendsId).subscribe(data => this.ngOnInit());
    this.checkFriend = true;
  }

  getMutualFriend(mutualFriend: User[]){
    this.mutualFriend = '';
    for(let i = 0 ; i < mutualFriend.length ; i++){
      if (i < 10) {
        this.mutualFriend += mutualFriend[i].userName + "<br>";
      } else {
        this.mutualFriend += "and more" + (mutualFriend.length - i) + "people";
        break;
      }
    }
  }

}
