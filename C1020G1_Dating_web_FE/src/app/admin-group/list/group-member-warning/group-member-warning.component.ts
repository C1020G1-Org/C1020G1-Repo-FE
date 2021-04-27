import { Title } from '@angular/platform-browser';

import { GroupUser } from 'src/app/model/group-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupWarning } from "../../../model/warning";
import { GroupManagementService } from "../../service/group.service";

@Component({
  selector: 'app-group-member-warning',
  templateUrl: './group-member-warning.component.html',
  styleUrls: ['./group-member-warning.component.css']
})
export class GroupMemberWarningComponent implements OnInit {
  data;
  list: GroupWarning[];
  page = 0;
  member: GroupUser = this.defaultMember();
  constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute,
    private groupManagementService: GroupManagementService, private title: Title) {
    this.data = groupManagementService.defaultPage;
  }

  ngOnInit(): void {
    this.title.setTitle('Group Warning');
    let id;
    this.activatedRoute.paramMap.subscribe(param => id = param.get('id'));
    this.groupManagementService.getMember(id).subscribe(data => this.member = data,() =>
      this.groupManagementService.navigate(404, this.getUrlNav()), () => {
        this.groupManagementService.groupId = this.member.group.groupId;
        this.groupManagementService.adminGroup();
      });
    this.set(id);
  }

  set(id) {
    this.groupManagementService.getListWarning(id, this.page).subscribe(data => this.data = data, () => console.log('no warning'), () => this.setList());
  }

  getUrlNav() {
    if (this.groupManagementService.groupId === undefined) {
      return '/';
    }
    return '/group/member/list/' + this.groupManagementService.groupId;
  }

  setList() {
    this.list = this.data.content;
  }

  open(content) {
    this.modalService.open(content);
  }

  defaultMember() {
    return {
      groupUserId: 0, group: null, user:
      {
        userId: null, userName: '', userAvatar: '', userBackground: '', account: null, address: '', birthday: '', email: '', gender: '',
        marriaged: '', occupation: '', status: null, ward: null
      }
    };
  }

  emit() {
    this.page = 0;
    this.set(this.member.groupUserId);
  }

  paging(page: number) {
    this.page = page;
    this.set(this.member.groupUserId);
  }
}
