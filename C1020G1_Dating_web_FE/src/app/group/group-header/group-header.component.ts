import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupRequest, GroupSocial, GroupUser} from "../../models/group_social";
import {GroupManagementService} from "../../service/groups/group-management.service";
import {GroupService} from "../../service/groups/group.service";
import {TokenStorageService} from "../../service/auth/token-storage";
import {NotificationRequestGroupService} from "../../service/groups/group-request-notification";
import {map} from "rxjs/operators";
import GroupRequestNotification from "../../models/groupRequestNotification";

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {
  group: GroupSocial = {
    groupId: null,
    groupName: '',
    admin: null,
    groupPublished: '',
    imageAvatarUrl: '',
    imageBackground: '',
    scope: ''
  };
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
              public router: Router, private tokenStorage: TokenStorageService,
              private groupManagementService: GroupManagementService,
              private modalService: NgbModal,
              private notificationRequestGroupService: NotificationRequestGroupService) {
  }

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
    let noti = new GroupRequestNotification();
    noti.id = this.group.groupId + '-' + this.tokenStorage.getUser().userId;
    noti.groupRequest = {
      groupRequestId: null,
      groupSocial: this.group, user: this.tokenStorage.getUser(),
      sender: "user"
    };
    this.groupService.saveRequest(noti.groupRequest).subscribe(() => {
      this.notificationRequestGroupService.create(noti, noti.groupRequest.groupSocial.admin.userId);
      window.location.reload();
    });
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

  deleteNoti() {
    this.notificationRequestGroupService.getAll(this.group.admin.userId).snapshotChanges().pipe(
      map(changes =>
        changes.map(data => ({key: data.payload.key, ...data.payload.val()})
        )
      )
    ).subscribe(data => {
      for (let e of data) {
        if (e.id === this.group.groupId + '-' + this.user.userId) {
          this.notificationRequestGroupService.delete(e.key, this.group.admin.userId);
        }
      }
      window.location.reload();
    });
  }

  get user() {
    return this.tokenStorage.getUser();
  }

  reload() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/group/details/' + this.group.groupId]);
    });
  }

  acceptRequest() {
    this.groupManagementService.acceptRequest(this.request.groupRequestId).subscribe(() => window.location.reload());
  }

  deniedRequest() {
    this.groupManagementService.deniedRequest(this.request.groupRequestId).subscribe(() => this.request.sender === 'user' ? this.deleteNoti() : window.location.reload());
  }

  open(content) {
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
