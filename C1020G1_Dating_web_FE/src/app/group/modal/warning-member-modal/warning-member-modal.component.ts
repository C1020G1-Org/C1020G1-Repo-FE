import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-member-modal',
  templateUrl: './warning-member-modal.component.html',
  styleUrls: ['./warning-member-modal.component.css']
})
export class WarningMemberModalComponent implements OnInit {
  @Input()
  modal;
  @Input()
  member;
  constructor() { }

  ngOnInit(): void {
  }

}
