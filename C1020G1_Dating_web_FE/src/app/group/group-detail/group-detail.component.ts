import { Component, OnInit } from '@angular/core';
import {GroupService} from "../service/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  public group;

  constructor(public groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              public router: Router,
              private title: Title){}

  ngOnInit(){
    this.title.setTitle("Group-detail");
    this.activatedRoute.paramMap.subscribe(data => {
      this.groupService.getGroupById(data.get("id")).subscribe(group =>{
        this.group = group;
      })
      console.log(this.group);
    });
  }

}
