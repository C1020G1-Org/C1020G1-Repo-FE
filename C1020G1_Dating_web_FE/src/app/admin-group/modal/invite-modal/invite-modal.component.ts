import { NotificationGroupService } from '../../service/group-notification.service';
import { GroupRequest } from './../../../model/group-request';
import { User } from '../../../model/user';
import { GroupManagementService } from '../../service/group.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/model/group';
import Notification from 'src/app/model/group-notification';

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
  constructor(private groupManagementService: GroupManagementService, private notificationGroupService: NotificationGroupService) { }

  ngOnInit(): void {
    this.changeListInvite('1');
  }

  changeListInvite(value: string) {
    if (value == '1') {
      this.feedback = '';
      this.groupManagementService.getListInviteFriends().subscribe(data => this.list = data, () => {}, () => this.member = this.list[0]);
    } else if (value == '2') {
      this.feedback = '';
      this.groupManagementService.getListInviteFriendsOfFriends().subscribe(data => this.list = data, () => {}, () => this.member = this.list[0]);
    } else {
      this.feedback = 'Type invalid!';
    }
    this.friendFeedback = '';
  }

  changeValue(value: string) {
    const id = parseFloat(value);
    this.member = undefined;
    this.friendFeedback = 'Friend invalid!';
    for (let user of this.list){
      if (user.userId == id){
        this.member = user;
        this.friendFeedback = '';
        break;
      }
    }
  }

  submit() {
    console.log(this.member);
    if (this.member != undefined || this.member != null) {
      let group: Group;
      let user: User;
      let groupRequest: GroupRequest;
      this.groupManagementService.getGroupById().subscribe(data => group = data, err => console.log(err), () =>
        this.groupManagementService.getUserById(this.member.userId).subscribe(data => user = data, () => { },
          () => {
            groupRequest = {
              groupRequestId: null,
              sender: 'admin',
              group: group,
              user: user
            }
            this.groupManagementService.inviteMember(groupRequest).subscribe(() => { }, err => console.log(err), () => {
              this.emit();
              this.noti(user.userId, group);
              this.modal.dismiss('ok close');
            })
          }));
    } else {
      this.friendFeedback = 'Friend invalid!';
    }
  }

  noti(id: number, group: Group) {
    let notification = new Notification();
    notification.userId = id;
    notification.content = group.groupName + ' invite you to join their group.';
    notification.sender = group.groupName;
    notification.href = '/group/' + group.groupId;
    notification.imageUrl = group.imageAvatarUrl;
    this.notificationGroupService.create(notification, id);
  }
}
