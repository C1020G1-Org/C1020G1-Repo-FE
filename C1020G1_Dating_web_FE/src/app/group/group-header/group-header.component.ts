import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {GroupRequest, GroupSocial, GroupUser} from "../../models/group_social";
import {GroupManagementService} from "../../service/groups/group-management.service";
import {GroupService} from "../../service/groups/group.service";
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {
  group: GroupSocial = { groupId: null, groupName: '', admin: null, groupPulished: '', imageAvatarUrl: '', imageBackground: '', scope: '' };
  groupId: number;
  groupName: string;
  isJoin: boolean = false;
  requestType: string = 'none';
  groupUser: GroupUser;
  groupRequest;
  request: GroupRequest;
  scope: string;


  constructor(public groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    public router: Router, private tokenStorage: TokenStorageService, private groupManagementService: GroupManagementService,private modalService: NgbModal) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.groupService.getGroupById(data.get("id")).subscribe(group => {
        this.group = group;
        this.groupService.getAllGroupRequest(this.user.userId).subscribe(data1 => {
          this.groupRequest = data1;
          for (let i = 0; i < this.groupRequest.length; i++) {
            if (this.group.groupId == this.groupRequest[i].groupSocial.groupId) {
              this.isJoin = true;
              this.request = this.groupRequest[i];
              this.requestType = this.request.sender;
            }
          }
        })
      })
      this.groupService.getGroupUserByGroupIdAndUserId(data.get("id"), this.user.userId).subscribe(data => {
        this.isJoin = true;
      });
    });
  }

  saveRequest() {
    this.groupService.saveRequest({
      groupSocial: this.group, user: this.tokenStorage.getUser(),
      sender: "user"
    }).subscribe(() => window.location.reload());
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

  get user() {
    return this.tokenStorage.getUser();
  }

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/group/details/' + this.group.groupId]);
    });
  }

  acceptRequest() {
    this.groupManagementService.acceptRequest(this.request.groupRequestId).subscribe(() => window.location.reload());
  }

  deniedRequest() {
    this.groupManagementService.deniedRequest(this.request.groupRequestId).subscribe(() => window.location.reload());
  }

  open(content){
    this.scope = this.group.scope;
    this.modalService.open(content);
  }

  editGroup() {
    this.group.scope = this.scope;
    this.groupService.editGroup(this.group).subscribe(() => {
      this.modalService.dismissAll();
      window.location.reload();
    });
  }
}
