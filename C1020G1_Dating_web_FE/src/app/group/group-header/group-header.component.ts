import { Component, OnInit } from '@angular/core';
import {GroupService} from "../service/group.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {
  public group;
  public groupId: number;
  public groupName: string;

  constructor(public groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              public router: Router) { }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(data => {
      this.groupService.getGroupById(data.get("id")).subscribe(group =>{
        this.group = group;
      })
      console.log(this.group);
    });
  }
  showDelete(groupId: number, groupName: string) {
    this.groupId = groupId;
    this.groupName = groupName;
    console.log(this.groupId,this.groupName);
  }

  delete() {
    this.groupService.deleteGroup(this.groupId).subscribe(group=>{
      this.router.navigateByUrl('');
    });
  }

}
