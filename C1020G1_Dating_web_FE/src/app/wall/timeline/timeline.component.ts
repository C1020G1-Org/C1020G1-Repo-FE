import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../user-service.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../model/Post";


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
   postInfos: Post[] ;
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
