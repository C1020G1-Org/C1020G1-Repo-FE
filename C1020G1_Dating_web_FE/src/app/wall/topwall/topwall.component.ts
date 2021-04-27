import { Component, OnInit } from '@angular/core';
import {User} from "../model/User";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-topwall',
  templateUrl: './topwall.component.html',
  styleUrls: ['./topwall.component.css']
})
export class TopwallComponent implements OnInit {
  public userInfo: User ;
  constructor(
    public userService : UserService ,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.findUserById(id).subscribe(data => {
      this.userInfo = data;
    });
  }

}
