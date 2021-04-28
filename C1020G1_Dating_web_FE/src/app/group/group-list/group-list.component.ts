import { TokenStorageService } from './../../service/auth/token-storage';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import { GroupService } from 'src/app/service/group.service';


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
    private title: Title,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(){
    this.title.setTitle("Group List");
    this.searchForm = this.formBuilder.group({
      search:""
    })

    this.groupService.getAllGroup().subscribe(data => {
      this.groups = data;
    });
  }

  onSubmit() {
    this.groupService.getGroupByName(this.searchForm.get("search").value).subscribe(data=>{
      this.groups = data;

    });
  }

  get user() {
     return this.tokenStorage.getUser();
  }
}
