import { Router } from '@angular/router';
import { GroupManagementService } from './../../service/group.service';
import { GroupRequest } from './../../../model/group-request';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accept-modal',
  templateUrl: './accept-modal.component.html',
  styleUrls: ['./accept-modal.component.css']
})
export class AcceptModalComponent implements OnInit {
  @Input()
  modal;
  @Input()
  member: GroupRequest;
  @Output()
  event = new EventEmitter();

  emit(){
    this.event.emit();
    this.modal.dismiss('ok close');
  }

  constructor(private groupManagementService: GroupManagementService, private router: Router) { }

  ngOnInit(): void {
  }

  accept(){
    this.groupManagementService.acceptRequest(this.member.groupRequestId).subscribe(null,null,() => this.emit());
  }
}
