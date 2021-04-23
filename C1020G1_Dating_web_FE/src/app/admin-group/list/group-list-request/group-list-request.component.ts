import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { GroupManagementService } from "../../service/group.service";
import { GroupRequest } from "../../../model/group-request";


@Component({
  selector: 'app-group-list-request',
  templateUrl: './group-list-request.component.html',
  styleUrls: ['./group-list-request.component.css']
})
export class GroupListRequestComponent implements OnInit {
  data;
  list: GroupRequest[] = [];
  listInvite: User[];
  page = 0;
  key = "";
  request: GroupRequest;
  constructor(private modalService: NgbModal, private groupManagementService: GroupManagementService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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
    this.groupManagementService.getListRequest(this.key, this.page).subscribe(data => this.data = data,err => console.log(err),() => this.list = this.list.concat(this.data.content));
  }
}
