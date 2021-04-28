import {Component, OnInit} from '@angular/core';
import {GroupService} from "../service/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  public group;
  public isJoin: boolean = false;


  constructor(public groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              public router: Router,
              private title: Title) {
  }

  status = {
    statusId: 1,
    statusName: "Online"
  };
  account = {
    accountId: 2,
    accountName: "abc",
    password: "abc"
  };
  province = {
    provinceId: 1,
    provinceName: "Đà Nẵng"
  };
  district = {
    districtId: 1,
    districtName: "Hải Châu",
    province: this.province
  };
  ward = {
    wardId: 1,
    wardName: "Đống Đa",
    district: this.district
  };
  userLogin = {
    userId: 14,
    userName: "Tùng 2",
    birthday: "1995-11-24",
    gender: "Male",
    occupation: "Abc",
    address: "Đà Nẵng",
    email: "abc@gmail.com",
    userAvatar: "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png",
    userBackground: "link",
    marriaged: "Yes",
    status: this.status,
    account: this.account,
    ward: this.ward,
  };
  ngOnInit() {
    this.title.setTitle("Group-detail");
    this.activatedRoute.paramMap.subscribe(data => {
      this.groupService.getGroupById(data.get("id")).subscribe(group => {
        this.group = group;

      })

      this.groupService.getGroupUserByGroupIdAndUserId(data.get("id"), this.userLogin.userId).subscribe(data => {
        this.isJoin = true;
      }, err => {
      });
    });
  }

}
