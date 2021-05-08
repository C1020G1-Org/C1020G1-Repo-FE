import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GroupUser} from "../../../models/group_social";
import {GroupManagementService} from "../../../service/groups/group-management.service";
import {NotificationGroupService} from "../../../service/groups/group-notification.service";
import NotificationGroup from "../../../models/groupNotification";

@Component({
  selector: 'app-remove-member-modal',
  templateUrl: './remove-member-modal.component.html',
  styleUrls: ['./remove-member-modal.component.css']
})
export class RemoveMemberModalComponent implements OnInit {
  @Input()
  modal;
  @Input()
  member: GroupUser;
  constructor(private groupManagementService: GroupManagementService, private router: Router, private notificationGroupService:NotificationGroupService) { }

  ngOnInit(): void {
  }

  remove() {
    this.groupManagementService.removeMember(this.member.groupUserId).subscribe(null, err => console.log(err), () => this.groupManagementService.navigate(404,this.getUrlNav()));
    this.modal.dismiss('ok close');
  }

  getUrlNav() {
    if (this.groupManagementService.groupId === undefined) {
      return '/';
    }
    return '/group/member/list/' + this.groupManagementService.groupId;
  }

  noti() {
    let notification = new NotificationGroup();
    notification.user = this.member.user;
    notification.content = this.member.groupSocial.groupName + ' have been remove you out from their group.';
    notification.groupSender = this.member.groupSocial;
    this.notificationGroupService.create(notification, this.member.user.userId);
  }
}
