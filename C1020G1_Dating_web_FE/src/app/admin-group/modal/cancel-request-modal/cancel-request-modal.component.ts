import { NotificationGroupService } from '../../service/group-notification.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GroupRequest } from 'src/app/model/group-request';
import Notification from 'src/app/model/group-notification';
import { GroupManagementService } from '../../service/group.service';

@Component({
  selector: 'app-cancel-request-modal',
  templateUrl: './cancel-request-modal.component.html',
  styleUrls: ['./cancel-request-modal.component.css']
})
export class CancelRequestModalComponent implements OnInit {
  @Input()
  modal;
  @Input()
  member: GroupRequest;
  @Output()
  event = new EventEmitter();
  show = false;

  emit(){
    this.event.emit();
    this.modal.dismiss('ok close');
    this.show = true;
  }

  constructor(private groupManagementService: GroupManagementService, private router: Router,private notificationGroupService: NotificationGroupService) { }

  ngOnInit(): void {
  }

  denied(){
    this.groupManagementService.deniedRequest(this.member.groupRequestId).subscribe(null,null,() => this.noti());
  }

  noti() {
    this.emit();
    let notification = new Notification();
    notification.userId = this.member.user.userId;
    notification.content = this.member.group.groupName + ' denied you.';
    notification.sender = this.member.group.groupName;
    notification.href = '/group/' + this.member.group.groupId;
    notification.imageUrl = this.member.group.imageAvatarUrl;
    this.notificationGroupService.create(notification, this.member.user.userId);
  }
}
