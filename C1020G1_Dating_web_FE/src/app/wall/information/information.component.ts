import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {FriendRequestService} from "../../services/friend-request.service";


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {


  userInfo: User;
  userLogin: User;

  constructor(private friendRequestService: FriendRequestService) {
  }

  ngOnInit(): void {
  }

}
