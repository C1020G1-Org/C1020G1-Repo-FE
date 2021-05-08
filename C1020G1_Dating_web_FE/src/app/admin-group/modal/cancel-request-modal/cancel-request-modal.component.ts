import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {GroupRequest} from "../../../models/group_social";
import {GroupManagementService} from "../../../service/groups/group-management.service";
import NotificationGroup from "../../../models/groupNotification";
import {NotificationGroupService} from "../../../service/groups/group-notification.service";

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
    let notification = new NotificationGroup();
    notification.user = this.member.user;
    notification.content = this.member.groupSocial.groupName + ' denied you.';
    notification.groupSender = this.member.groupSocial;
    this.notificationGroupService.create(notification, this.member.user.userId);
  }
}
