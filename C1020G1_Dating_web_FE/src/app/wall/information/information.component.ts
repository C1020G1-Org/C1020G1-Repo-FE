import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user-model";
import {UserServiceService} from "../../service/user-service.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  public userInfo: User ;

  constructor(
    public userService : UserServiceService ,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.findUserById(id).subscribe(data => {
      this.userInfo = data;

    });
  }

}
