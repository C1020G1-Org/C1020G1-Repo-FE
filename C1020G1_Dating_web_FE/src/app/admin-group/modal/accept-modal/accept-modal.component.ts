import { NotificationService } from './../../service/notification.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {GroupRequest} from "../../../model/group-request";
import {GroupManagementService} from "../../service/group.service";
import Notification from 'src/app/model/notification';

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

  constructor(private groupManagementService: GroupManagementService, private router: Router,private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  accept(){
    this.groupManagementService.acceptRequest(this.member.groupRequestId).subscribe(null,null,() => this.noti());
  }

  noti() {
    this.emit();
    let notification = new Notification();
    notification.userId = this.member.user.userId;
    notification.content = 'You have a notify: ' + this.member.group.groupName + ' accept you to join their group.';
    notification.sender = this.member.group.groupName;
    notification.href = '/group/' + this.member.group.groupId;
    this.notificationService.create(notification, this.member.user.userId);
  }
}
