import { Component, OnInit } from '@angular/core';
import {Status} from "../../model/status";
import {Account} from "../../model/account";
import {Province} from "../../model/province";
import {District} from "../../model/district";
import {Ward} from "../../model/ward";
import {User} from "../../model/user";
import {FriendRequest} from "../../model/friend_request";
import {WallService} from "../wall.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(private wallService: WallService) { }

  ngOnInit(): void {
  }

  addFriendRequest() {

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

    let userInfo: User;
    userInfo = {
      userId: 3,
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

    let userLogin: User;
    userLogin = {
      userId: 4,
      userName: "Tùng 3",
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


    let friendRequest: FriendRequest;
    friendRequest = {
      sendUser: userLogin,
      receiveUser: userInfo,
    };

    this.wallService.createFriendRequest(friendRequest).subscribe();
  }
}
