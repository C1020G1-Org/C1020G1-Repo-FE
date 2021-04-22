import { ActivatedRoute } from '@angular/router';
import { GroupManagementService } from './../../service/group.service';
import { GroupRequest } from './../../../model/group-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

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
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.groupManagementService.defaultPage;
    let id;
    this.activatedRoute.paramMap.subscribe(param => id = param.get('id'));
    this.set();
  }

  set(){
    this.groupManagementService.getListRequest(this.key,this.page).subscribe(data => this.data = data,null,() => this.setList());
  }

  setList(){
    this.list = this.data.content;
  }

  open(content){
    this.modalService.open(content);
  }

  setRequest(value){
    this.request = value;
  }

  addList(){}
}
