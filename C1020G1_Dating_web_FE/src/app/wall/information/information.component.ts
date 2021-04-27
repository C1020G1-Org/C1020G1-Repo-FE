import {Component, OnInit} from '@angular/core';
import {FriendRequestService} from "../../services/friend-request.service";
import {UserServiceService} from "../user-service.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  public userInfo;

  constructor(
    public userService: UserServiceService,
    private activatedRoute: ActivatedRoute,
    private friendRequestService: FriendRequestService
  ) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.findUserById(id).subscribe(data => {
      this.userInfo = data;
    });

  }
}
