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
import firebase from "firebase";
import {snapshotToArray} from "../../chat/chat-room/chat-room.component";
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  private userId;
  private user: Object;
  private account: Object;
  private nickname = '';


  constructor(private wallService: WallService,
              private tokenStorage: TokenStorageService) {
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

  sendIdRequest(idFriendRequest: number) {
    this.idFriendRequest = idFriendRequest;
  }

  deleteFriendRequest() {
    this.checkFriendRequest2 = true;
    this.wallService.deleteFriendRequest(this.idFriendRequest).subscribe(data => this.ngOnInit());
  }

  acceptFriendRequest(friendRequest: FriendRequest) {
    this.checkFriendRequest = true;
    this.wallService.acceptFriendRequest(friendRequest).subscribe(() => {
      this.wallService.getUser(this.userWall.userId).subscribe(data => {
        //ThinhHN
        this.user = data;
        this.wallService.getUser(this.userLogin.userId).subscribe(data2 => {
          this.account = data2;
          console.log(data2);
          this.wallService.acceptFriendRequest(friendRequest).subscribe();
          const newRoom = firebase.database().ref('rooms/').push();
          console.log(this.account);
          const room = {roomname: ''};
          room.roomname =  this.userWall.userName;
          console.log(this.userLogin.userName);
          console.log(this.userWall.userName);
          newRoom.set(room);

          firebase.database().ref('roomusers/').orderByChild('roomname')
            .equalTo(room.roomname)
            .once('value', (resp: any) => {
              let roomuser = [];
              const nickname = this.userLogin.userName;
              const nickname1 = this.userWall.userName;
              const id1 = this.userWall.userId;
              const avatar = this.userWall.userAvatar;
              const avatar1 = this.userLogin.userAvatar;
              const nickNameFriend = this.userWall.userName;
              roomuser = snapshotToArray(resp);
              const user = roomuser.find(x => x.nickname === this.nickname);

                this.userLogin.userId = this.tokenStorage.getUser().userId;
                const newroomuser = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: ''};
                newroomuser.roomname = room.roomname;
                newroomuser.nickname = nickname;
                newroomuser.id = (this.tokenStorage.getUser().userId).toString();
                newroomuser.status = 'online';
                newroomuser.avatar = avatar;
                newroomuser.nickNameFriend = nickname1;
                console.log(newroomuser);
                const newRoomUser = firebase.database().ref('roomusers/').push();
                newRoomUser.set(newroomuser);

                // THêm userroom của cả 2 người,
                const newroomuser1 = {roomname: '', nickname: '', id: '', status: '', avatar: '', nickNameFriend: ''};
                newroomuser1.roomname = room.roomname;
                newroomuser1.nickname = nickname1;
                newroomuser1.id = id1.toString();
                newroomuser1.status = 'online';
                newroomuser1.avatar = avatar1;
                newroomuser1.nickNameFriend = nickname;
                console.log(newroomuser1);
                const newRoomUser1 = firebase.database().ref('roomusers/').push();
                newRoomUser1.set(newroomuser1);

            });
        });
      });
    });
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

}
