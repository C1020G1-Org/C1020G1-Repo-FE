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
   public pageNumber = 0;

  constructor(
    public groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private title:Title) { }

  getAllGroupMember(){
    this.activatedRoute.paramMap.subscribe(data =>{
      console.log(data);
      this.groupService.getAllMemberGroup(data.get("id"), this.pageNumber).subscribe(data1 => {
        // this.groupMember = data1;
        let listMembers = data1.content;
        if (this.groupMember != null){
          this.groupMember = this.groupMember.concat(listMembers);
        }else {
          this.groupMember = listMembers;
        }
      });
    })

  }
  ngOnInit() {
    this.title.setTitle("Group Member");
    this.getAllGroupMember();
  }

  loadMoreMember() {
    this.pageNumber++;
    this.getAllGroupMember();
  }
}
