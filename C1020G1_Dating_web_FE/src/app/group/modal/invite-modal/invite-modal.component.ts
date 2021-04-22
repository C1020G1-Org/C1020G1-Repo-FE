import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.css']
})
export class InviteModalComponent implements OnInit {
  list = [];
  constructor() { }

  ngOnInit(): void {
  }

  changeListInvite(value: string){
    if (value == '1' || value == '2'){
      
    }
  }
}
