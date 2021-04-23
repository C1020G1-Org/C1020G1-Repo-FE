
import { Component, Input, OnInit } from '@angular/core';
import {GroupUser} from "../../../model/group-user";

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.css']
})
export class GroupMemberComponent implements OnInit {
  @Input()
  member: GroupUser;
  constructor() {
  }

  ngOnInit(): void {
  }
}
