import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {GroupRequest} from "../../../models/group_social";
import {GroupManagementService} from "../../../service/groups/group-management.service";
import {NotificationGroupService} from "../../../service/groups/group-notification.service";
import NotificationGroup from "../../../models/groupNotification";

@Component({
  selector: 'app-accept-modal',
  templateUrl: './accept-modal.component.html',
  styleUrls: ['./accept-modal.component.css']
})
export class AcceptModalComponent implements OnInit {
  @Input()
  modal;
  @Input()
  member: GroupRequest;
  @Output()
  event = new EventEmitter();

  emit(){
    this.event.emit();
    this.modal.dismiss('ok close');
  }

  constructor(private groupManagementService: GroupManagementService, private router: Router,private notificationGroupService: NotificationGroupService) { }

  ngOnInit(): void {
  }

  accept(){
    this.groupManagementService.acceptRequest(this.member.groupRequestId).subscribe(null,null,() => this.noti());
  }

  noti() {
    this.emit();
    let notification = new NotificationGroup();
    notification.user = this.member.user;
    notification.groupSender = this.member.groupSocial;
    notification.content = this.member.groupSocial.groupName + ' accept you to join their group.';
    this.notificationGroupService.create(notification, this.member.user.userId);
  }
}
