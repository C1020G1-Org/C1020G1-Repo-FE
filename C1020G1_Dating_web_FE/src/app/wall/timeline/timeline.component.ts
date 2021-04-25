import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../user-service.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../model/Post";
import {PostImage} from "../model/PostImage";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  postInfo: Post ;
  constructor(
    public userService : UserServiceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.findPostById(id).subscribe(data => {
      this.postInfo = data;
      console.log(this.postInfo)
    });
  }o

}
