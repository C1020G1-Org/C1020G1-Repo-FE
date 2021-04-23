import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../header_service/header-service.service";
import {FriendRequest} from "../../model/friend_request";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  listFriendRequest: FriendRequest[];

  ngOnInit(): void {
  }


  getFriendsRequest(id:number) {
    this.headerService.getAllFriendRequest(id).subscribe(data => this.listFriendRequest = data);
  }
}
