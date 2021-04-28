import { GroupUser } from './../../../model/group-user';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupWarning } from 'src/app/model/warning';
import Notification from 'src/app/model/group-notification';
import { NotificationGroupService } from 'src/app/service/group-notification.service';
import { GroupManagementService } from 'src/app/service/group-management.service';

@Component({
  selector: 'app-warning-member-modal',
  templateUrl: './warning-member-modal.component.html',
  styleUrls: ['./warning-member-modal.component.css']
})
export class WarningMemberModalComponent implements OnInit {
  @Input()
  modal;
  @Input()
  member: GroupUser;
  @Output()
  event = new EventEmitter();
  isValid: boolean = true;

  emit() {
    this.event.emit();
  }
  type: string = '18+ post';
  constructor(private groupManagementService: GroupManagementService, private notificationGroupService: NotificationGroupService) { }

  ngOnInit(): void {
  }

  changeValue(value: string) {
    if (value !== '18+ post' && value !== 'Impolite post' && value !== 'Racism post') {
      this.isValid = false;
    } else {
      this.type = value;
      this.isValid = true;
    }
  }

  warning() {
    if (this.isValid) {
      const date = new Date();
      let dateStr = date.getFullYear() + '-';
      if (date.getMonth() < 10) {
        dateStr += '0';
      }
      dateStr += date.getMonth() + 1 + '-' + date.getDate();
      const groupWarning: GroupWarning = {
        groupWarningId: null,
        warningContent: this.type,
        groupUser: this.member,
        warningDate: dateStr
      }
      this.groupManagementService.warningMember(groupWarning).subscribe(() => { }, () => { }, () => {
        this.noti();
        this.modal.dismiss('ok close');
      });
    }
  }

  noti() {
    this.emit();
    let notification = new Notification();
    notification.userId = this.member.user.userId;
    notification.content = this.member.group.groupName + ' Warn you for ' + this.type;
    notification.sender = this.member.group.groupName;
    notification.href = '/group/' + this.member.group.groupId;
    notification.imageUrl = this.member.group.imageAvatarUrl;
    this.notificationGroupService.create(notification, this.member.user.userId);
  }
}
