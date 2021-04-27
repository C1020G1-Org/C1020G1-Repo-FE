import { Component, OnInit } from '@angular/core';
import {GroupService} from "../service/group.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {
  public group;
  public groupId: number;
  public groupName: string;
  public isJoin: boolean = false;
  public groupUser;
  public groupRequest;


  constructor(public groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              public router: Router) { }


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
  ngOnInit(){


    this.activatedRoute.paramMap.subscribe(data => {
      this.groupService.getGroupById(data.get("id")).subscribe(group =>{
        this.group = group;
        this.groupService.getAllGroupRequest(this.userLogin.userId).subscribe(data1=>{
          this.groupRequest = data1;
          for (let i=0;i<this.groupRequest.length;i++){
            if  (this.group.groupId == this.groupRequest[i].group.groupId){
              this.isJoin = true;
            }

          }
        })
      })

      this.groupService.getGroupUserByGroupIdAndUserId(data.get("id"), this.userLogin.userId).subscribe(data => {
        this.isJoin = true;
      }, err => {
      });
    });

  }

  saveRequest(){
    this.groupService.saveRequest({group: this.group, user: this.userLogin,
      sender: "user"}).subscribe(()=>this.ngOnInit())

  }
  showDelete(groupId: number, groupName: string) {
    this.groupId = groupId;
    this.groupName = groupName;
  }

  delete() {
    this.groupService.deleteGroup(this.groupId).subscribe(group=>{
      this.router.navigateByUrl('');
    });
  }

}
