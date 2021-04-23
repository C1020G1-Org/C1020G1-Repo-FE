import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GroupUser } from 'src/app/model/group-user';
import {GroupManagementService} from "../../service/group.service";

@Component({
  selector: 'app-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.css']
})
export class GroupMemberListComponent implements OnInit {
  data;
  list: GroupUser[] = [];
  page = 0;
  key = "";
  constructor(private groupManagementService: GroupManagementService,private activatedRoute: ActivatedRoute, private router: Router) {
    this.data = this.groupManagementService.defaultPage;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => this.groupManagementService.groupId = parseFloat(param.get('id')));
    this.groupManagementService.adminGroup();
    this.groupManagementService.getListMember("", this.page).subscribe(data => this.data = data,err => this.groupManagementService.navigate(err.status,'/'), () => this.setList());
  }

  setList() {
    this.list = this.data.content;
  }

  addList() {
    this.page++;
    this.groupManagementService.getListMember(this.key, this.page).subscribe(data => this.data = data, null,
      () => this.list = this.list.concat(this.data.content as GroupUser[]));
  }
}
