import { Component, OnInit } from '@angular/core';
import {GroupService} from "../service/group.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.css']
})
export class GroupMemberComponent implements OnInit {
   groupMember: any;
   group;

  constructor(public groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              private title:Title) { }

  ngOnInit(){
    this.title.setTitle("Group Member");
    this.activatedRoute.paramMap.subscribe(data => {

      this.groupService.getAllMemberGroup(data.get("id")).subscribe(groupUser=> {
        this.groupMember = groupUser;
      });
      })
  }
}
