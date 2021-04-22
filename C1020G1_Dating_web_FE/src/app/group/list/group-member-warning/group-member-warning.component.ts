import { GroupWarning } from './../../../model/warning';
import { GroupManagementService } from './../../service/group.service';
import { GroupUser } from 'src/app/model/group-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-member-warning',
  templateUrl: './group-member-warning.component.html',
  styleUrls: ['./group-member-warning.component.css']
})
export class GroupMemberWarningComponent implements OnInit {
  data;
  list: GroupWarning[];
  page = 0;
  member: GroupUser;
  constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, 
    private groupManagementService: GroupManagementService, private router: Router) { 
    this.data = groupManagementService.defaultPage;
  }

  ngOnInit(): void {
    let id;
    this.activatedRoute.paramMap.subscribe(param => id = param.get('id'));
    this.groupManagementService.getMember(id).subscribe(data => this.member = data,err => this.navigate(err.status));
    this.groupManagementService.getListWarning(id, this.page).subscribe(data => this.data = data, () => console.log('no warning'), () => this.setList());
  }

  navigate(status: number){
    if (status == 404){
      this.router.navigateByUrl('/group/member/list');
    }
  }

  setList() {
    this.list = this.data.content;
    this.page = 1;
  }

  open(content) {
    this.modalService.open(content);
  }
}
