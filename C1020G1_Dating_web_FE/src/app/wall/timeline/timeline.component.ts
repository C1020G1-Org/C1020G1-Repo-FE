import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Post} from "../model/Post";
import {UserService} from "../service/user.service";
import {User} from "../model/User";
import {ParentComment} from "../model/ParentComment";


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
   postInfos: Post[] ;
  userLogging: User;
  parentComments: ParentComment[];
  constructor(
    public userService : UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.findPostById(id).subscribe(data => {
      this.postInfos = data;
      console.log(this.postInfos)
    });
  }

}
