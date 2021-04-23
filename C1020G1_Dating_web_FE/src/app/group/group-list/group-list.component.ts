import { Component, OnInit } from '@angular/core';
import {GroupService} from '../service/group.service';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  public groups;
  term: any;

  constructor(
    public groupService: GroupService
  ) { }

  ngOnInit(){
    this.groupService.getAllGroup().subscribe(data => {
      this.groups = data;
      console.log(this.groups);
    });
  }

}
