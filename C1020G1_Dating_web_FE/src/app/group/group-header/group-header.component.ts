import { GroupService } from './../service/group.service';
import { Group } from './../../model/group';
import { TokenStorageService } from './../../service/auth/token-storage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {
  public group: Group;
  public groupId: number;
  public groupName: string;
  public isJoin: boolean = false;
  public groupUser;
  public groupRequest;


  constructor(public groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    public router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.groupService.getGroupById(data.get("id")).subscribe(group => {
        this.group = group;
        this.groupService.getAllGroupRequest(this.tokenStorage.getUser().userId).subscribe(data1 => {
          this.groupRequest = data1;
          for (let i = 0; i < this.groupRequest.length; i++) {
            if (this.group.groupId == this.groupRequest[i].group.groupId) {
              this.isJoin = true;
            }
          }
        })
      })

      this.groupService.getGroupUserByGroupIdAndUserId(data.get("id"), this.tokenStorage.getUser().userId).subscribe(data => {
        this.isJoin = true;
      }, err => {
      });
    });

  }

  saveRequest() {
    this.groupService.saveRequest({
      group: this.group, user: this.tokenStorage.getUser(),
      sender: "user"
    }).subscribe(() => this.ngOnInit())

  }
  showDelete(groupId: number, groupName: string) {
    this.groupId = groupId;
    this.groupName = groupName;
  }

  delete() {
    this.groupService.deleteGroup(this.groupId).subscribe(group => {
      this.router.navigateByUrl('');
    });
  }

  get userId() {
    return this.tokenStorage.getUser().userId;
  }
}
