import { GroupUser } from 'src/app/model/group-user';
import { GroupManagementService } from '../../service/group.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Notification from 'src/app/model/group-notification';
import { NotificationGroupService } from '../../service/group-notification.service';

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
    let notification = new Notification();
    notification.userId = this.member.user.userId;
    notification.content = this.member.group.groupName + ' have been remove you out from their group.';
    notification.sender = this.member.group.groupName;
    notification.href = '/group/' + this.member.group.groupId;
    notification.imageUrl = this.member.group.imageAvatarUrl;
    this.notificationGroupService.create(notification, this.member.user.userId);
  }
}
