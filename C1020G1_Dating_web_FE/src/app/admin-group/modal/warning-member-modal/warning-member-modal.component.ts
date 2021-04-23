import { GroupManagementService } from './../../service/group.service';
import { GroupUser } from './../../../model/group-user';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupWarning } from 'src/app/model/warning';

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

  emit() {
    this.event.emit();
  }
  type: string = '18+ post';
  constructor(private groupManagementService: GroupManagementService) { }

  ngOnInit(): void {
  }

  warning() {
    const date = new Date();
    let dateStr = date.getFullYear() + '-';
    if (date.getMonth() < 10) {
      dateStr += '0';
    }
    dateStr += date.getMonth() + '-' + date.getDate();
    const groupWarning: GroupWarning = {
      groupWarningId: null,
      warningContent: this.type,
      groupUser: this.member,
      warningDate: dateStr
    }
    this.groupManagementService.warningMember(groupWarning).subscribe(() => { }, err => console.log(err),() => {
      this.emit();
      this.modal.dismiss('ok close');
    });
  }
}
