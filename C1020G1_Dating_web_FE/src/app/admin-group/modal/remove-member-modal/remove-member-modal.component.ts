import { GroupUser } from 'src/app/model/group-user';
import { GroupManagementService } from '../../service/group.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-member-modal',
  templateUrl: './remove-member-modal.component.html',
  styleUrls: ['./remove-member-modal.component.css']
})
export class RemoveMemberModalComponent implements OnInit {
  @Input()
  modal;
  @Input()
  member: GroupUser;
  constructor(private groupManagementService: GroupManagementService, private router: Router) { }

  ngOnInit(): void {
  }

  remove() {
    this.groupManagementService.removeMember(this.member.groupUserId).subscribe(null, err => console.log(err), () => this.groupManagementService.navigate(404,this.getUrlNav()));
    this.modal.dismiss('ok close');
  }

  getUrlNav() {
    if (this.groupManagementService.groupId === undefined) {
      return '/';
    }
    return '/group/member/list/' + this.groupManagementService.groupId;
  }
}
