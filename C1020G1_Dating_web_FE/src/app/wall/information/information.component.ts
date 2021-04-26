import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {FriendRequest} from "../../model/friend_request";
import {Status} from "../../model/status";
import {Account} from "../../model/account";
import {Ward} from "../../model/ward";
import {Province} from "../../model/province";
import {District} from "../../model/district";
import {WallService} from "../wall.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {


  userInfo: User;
  userLogin: User;

  constructor(private wallService: WallService) {
  }

  ngOnInit(): void {
  }

}
