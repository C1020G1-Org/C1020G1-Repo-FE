import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {GroupUser} from "../../../models/group_social";
import {GroupManagementService} from "../../../service/groups/group-management.service";
import {NotificationGroupService} from "../../../service/groups/group-notification.service";
import {GroupWarning} from "../../../models/warning";
import NotificationGroup from "../../../models/groupNotification";

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
    let notification = new NotificationGroup();
    notification.user = this.member.user;
    notification.content = this.member.groupSocial.groupName + ' Warn you for ' + this.type;
    notification.groupSender = this.member.groupSocial;
    this.notificationGroupService.create(notification, this.member.user.userId);
  }
}
