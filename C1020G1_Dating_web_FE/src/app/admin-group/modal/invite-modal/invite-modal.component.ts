import { TokenStorageService } from './../../../service/auth/token-storage';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {User} from "../../../models/user-model";
import {GroupManagementService} from "../../../service/groups/group-management.service";
import {NotificationGroupService} from "../../../service/groups/group-notification.service";
import {GroupRequest, GroupSocial} from "../../../models/group_social";
import NotificationGroup from "../../../models/groupNotification";

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.css']
})
export class InviteModalComponent implements OnInit {
  @Input()
  modal;
  list: User[] = [];
  member: User;
  @Output()
  event = new EventEmitter();
  feedback: string = '';
  friendFeedback: string = '';

  emit() {
    this.event.emit();
  }
  constructor(private groupManagementService: GroupManagementService, private notificationGroupService: NotificationGroupService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.changeListInvite('1');
  }

  changeListInvite(value: string) {
    if (value == '1') {
      this.feedback = '';
      this.groupManagementService.getListInviteFriends().subscribe(data => this.list = data, () => { }, () => this.member = this.list[0]);
    } else if (value == '2') {
      this.feedback = '';
      this.groupManagementService.getListInviteFriendsOfFriends().subscribe(data => this.list = data, () => { }, () => this.member = this.list[0]);
    } else {
      this.feedback = 'Type invalid!';
    }
    this.friendFeedback = '';
  }

  changeValue(value: string) {
    const id = parseFloat(value);
    this.member = undefined;
    this.friendFeedback = 'Friend invalid!';
    for (let user of this.list) {
      if (user.userId == id) {
        this.member = user;
        this.friendFeedback = '';
        break;
      }
    }
  }

  submit() {
    if (this.member != undefined || this.member != null) {
      let group: GroupSocial;
      let groupRequest: GroupRequest;
      this.groupManagementService.getGroupById().subscribe(data => group = data, err => console.log(err), () =>
        {
          groupRequest = {
            groupRequestId: null,
            sender: 'admin',
            groupSocial: group,
            user: this.member
          }
          this.groupManagementService.inviteMember(groupRequest).subscribe(() => { }, err => console.log(err), () => {
            this.emit();
            this.noti(this.member, group);
            this.modal.dismiss('ok close');
          })
        });
    } else {
      this.friendFeedback = 'Friend invalid!';
    }
  }

  noti(user: User, group: GroupSocial) {
    let notification = new NotificationGroup();
    notification.user = user;
    notification.content = group.groupName + ' invite you to join their group.';
    notification.groupSender = group;
    this.notificationGroupService.create(notification, user.userId);
  }
}
