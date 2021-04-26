import { Component, OnInit } from '@angular/core';
import {GroupService} from "../service/group.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.css']
})
export class GroupMemberComponent implements OnInit {
   groupMember: any;
   group;

  constructor(public groupService: GroupService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(data => {

      this.groupService.getAllMemberGroup(data.get("id")).subscribe(groupUser=> {
        console.log(groupUser);
        this.groupMember = groupUser;
      });
      })
      console.log(this.groupMember);
      console.log(this.group);
  }

}
