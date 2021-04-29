import { GroupUser } from 'src/app/model/group-user';
import { GroupRequest } from 'src/app/model/group-request';
import { GroupManagementService } from 'src/app/service/group-management.service';
import { Group } from './../../model/group';
import { TokenStorageService } from './../../service/auth/token-storage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {
  group: Group = { groupId: null, groupName: '', admin: null, groupPulished: '', imageAvatarUrl: '', imageBackground: '', scope: '' };
  groupId: number;
  groupName: string;
  isJoin: boolean = false;
  requestType: string = 'none';
  groupUser: GroupUser;
  groupRequest: GroupRequest[];
  request: GroupRequest;


  constructor(public groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    public router: Router, private tokenStorage: TokenStorageService, private groupManagementService: GroupManagementService) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(data => {
    //   this.groupService.getGroupById(data.get("id")).subscribe(group => {
    //     this.group = group;
    //     this.groupService.getAllGroupRequest(this.tokenStorage.getUser().userId).subscribe(data1 => {
    //       this.groupRequest = data1;
    //       for (let i = 0; i < this.groupRequest.length; i++) {
    //         if (this.group.groupId == this.groupRequest[i].group.groupId) {
    //           this.isJoin = true;
    //           this.request = this.groupRequest[i];
    //           this.requestType = this.request.sender;
    //         }
    //       }
    //     })
    //   })
    //   this.groupService.getGroupUserByGroupIdAndUserId(data.get("id"), this.tokenStorage.getUser().userId).subscribe(data => {
    //     this.isJoin = true;
    //   });
    //
    // });
  }

  saveRequest() {
    this.groupService.saveRequest({
      group: this.group, user: this.tokenStorage.getUser(),
      sender: "user"
    }).subscribe(() => this.reload());
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

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/group/details/' + this.group.groupId]);
    });
  }

  acceptRequest() {
    this.groupManagementService.acceptRequest(this.request.groupRequestId).subscribe(() => this.reload());
  }

  deniedRequest() {
    this.groupManagementService.deniedRequest(this.request.groupRequestId).subscribe(() => this.reload());
  }
}
