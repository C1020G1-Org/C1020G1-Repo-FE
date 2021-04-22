import { GroupManagementService } from '../../service/group.service';
import { Component, OnInit } from '@angular/core';
import { GroupUser } from 'src/app/model/group-user';

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
  constructor(private groupManagementService: GroupManagementService) { 
    this.data = this.groupManagementService.defaultPage;
  }

  ngOnInit(): void {
    this.groupManagementService.getListMember("", this.page).subscribe(data => this.data = data, null, () => this.setList());
  }

  setList() {
    this.list = this.data.content;
    this.page = 1;
  }

  addList() {
    this.groupManagementService.getListMember(this.key, this.page).subscribe(data => this.data = data, null,
      () => this.list = this.list.concat(this.data.content as GroupUser[]));
      this.page += 1;
  }
}
