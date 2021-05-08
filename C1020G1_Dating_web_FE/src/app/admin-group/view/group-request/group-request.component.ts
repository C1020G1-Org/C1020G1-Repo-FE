
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupUser} from "../../../models/group_social";

@Component({
  selector: 'app-group-request',
  templateUrl: './group-request.component.html',
  styleUrls: ['./group-request.component.css']
})
export class GroupRequestComponent implements OnInit {
  @Input()
  member: GroupUser;
  @Output()
  event = new EventEmitter();
  @Output()
  cancelMember = new EventEmitter();

  accept(){
    this.event.emit(this.member);
  }

  cancel(){
    this.cancelMember.emit(this.member);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
