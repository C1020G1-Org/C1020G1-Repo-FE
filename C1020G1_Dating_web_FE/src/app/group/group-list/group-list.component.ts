import { Component, OnInit } from '@angular/core';
import {GroupService} from '../service/group.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  public groups;
  searchForm: FormGroup;

  constructor(
    public groupService: GroupService,
    private formBuilder: FormBuilder,
    private title: Title
  ) { }

  ngOnInit(){
    this.title.setTitle("Group List");
    this.searchForm = this.formBuilder.group({
      search:""
    })

    this.groupService.getAllGroup().subscribe(data => {
      this.groups = data;
      console.log(this.groups);
    });
  }

  onSubmit() {
    this.groupService.getGroupByName(this.searchForm.get("search").value).subscribe(data=>{
      this.groups = data;
      console.log(this.groups);

    });
  }
}
