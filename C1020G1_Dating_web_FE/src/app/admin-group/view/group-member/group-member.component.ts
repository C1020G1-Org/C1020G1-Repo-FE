import { Component, Input, OnInit } from '@angular/core';
import {GroupUser} from "../../../models/group_social";


@Component({
  selector: 'app-group-memberz',
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
