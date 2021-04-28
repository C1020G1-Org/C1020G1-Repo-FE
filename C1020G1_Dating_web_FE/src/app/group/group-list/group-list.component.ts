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
  public pageNumber = 0;
  searchForm: FormGroup;

  constructor(
    public groupService: GroupService,
    private formBuilder: FormBuilder,
    private title: Title
  ) { }

  getAllGroup(){
    this.groupService.getAllGroup(this.pageNumber).subscribe(data => {
      let listGroups = data.content;
      if (this.groups != null){
        this.groups = this.groups.concat(listGroups);
      }else {
        this.groups = listGroups;
      }
    });
  }

  ngOnInit(){
    this.title.setTitle("Group List");
    this.searchForm = this.formBuilder.group({
      search:""
    });
    this.getAllGroup();
  }

  onSubmit() {
    this.groupService.getGroupByName(this.searchForm.get("search").value).subscribe(data=>{
      this.groups = data;
    this.loadMoreGroup();
    });
  }

  loadMoreGroup() {
    this.pageNumber ++;
    this.getAllGroup();
  }
}
