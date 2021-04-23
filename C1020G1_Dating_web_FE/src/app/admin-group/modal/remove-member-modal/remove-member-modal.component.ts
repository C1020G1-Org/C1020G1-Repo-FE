import { GroupUser } from 'src/app/model/group-user';
import { GroupManagementService } from '../../service/group.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Notification from 'src/app/model/notification';
import { NotificationService } from '../../service/notification.service';

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
  constructor(private groupManagementService: GroupManagementService, private router: Router, private notificationService:NotificationService) { }

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
    notification.content = 'You have a notify: ' + this.member.group.groupName + ' have been remove you out from their group.';
    notification.sender = this.member.group.groupName;
    notification.href = '/group/' + this.member.group.groupId;
    this.notificationService.create(notification, this.member.user.userId);
  }
}
