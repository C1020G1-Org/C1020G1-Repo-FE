import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Post} from "../model/Post";

import {ParentComment} from "../model/ParentComment";
import {User} from "../../models/user-model";
import {UserServiceService} from "../../service/user-service.service";


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
    public userService : UserServiceService,
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
