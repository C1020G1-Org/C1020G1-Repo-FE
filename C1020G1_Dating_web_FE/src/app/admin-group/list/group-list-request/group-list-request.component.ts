import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import {GroupManagementService} from "../../../service/groups/group-management.service";
import {GroupRequest} from "../../../models/group_social";



@Component({
  selector: 'app-group-list-request',
  templateUrl: './group-list-request.component.html',
  styleUrls: ['./group-list-request.component.css']
})
export class GroupListRequestComponent implements OnInit {
  data;
  list: GroupRequest[] = [];
  page = 0;
  key = "";
  request: GroupRequest;
  constructor(private modalService: NgbModal, private groupManagementService: GroupManagementService,
    private activatedRoute: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Group Request List');
    this.data = this.groupManagementService.defaultPage;
    this.activatedRoute.paramMap.subscribe(param => this.groupManagementService.groupId = parseFloat(param.get('id')));
    this.groupManagementService.adminGroup();
    this.set();
  }

  set() {
    this.groupManagementService.getListRequest(this.key, this.page).subscribe(data => this.data = data, err =>
      this.groupManagementService.navigate(err.status, '/group/member/list/' + this.groupManagementService.groupId), () => this.setList());
  }

  setList() {
    this.list = this.data.content;
  }

  open(content) {
    this.modalService.open(content);
  }

  setRequest(value) {
    this.request = value;
  }

  addList() {
    this.page++;
    this.groupManagementService.getListRequest(this.key, this.page).subscribe(data => this.data = data, err => {}, () => this.list = this.list.concat(this.data.content));
  }
}
