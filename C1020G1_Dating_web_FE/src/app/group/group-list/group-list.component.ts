import { TokenStorageService } from './../../service/auth/token-storage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { GroupService } from 'src/app/service/group.service';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  public groups;
  public pageNumber = 0;
  searchForm: FormGroup;
  data;

  constructor(
    public groupService: GroupService,
    private formBuilder: FormBuilder,
    private title: Title,
    private tokenStorage: TokenStorageService
  ) { }

  getAllGroup() {
    this.groupService.getAllGroup(this.pageNumber,this.searchForm.get("search").value.trim()).subscribe(data => {
      if (this.groups != null){
        this.groups = this.groups.concat(data.content);
      } else {
        this.groups = data.content;
      }
      this.data = data;
    });
  }

  ngOnInit() {
    this.title.setTitle("Group List");
    this.searchForm = this.formBuilder.group({
      search: ""
    });
    this.getAllGroup();
  }

  onSubmit() {
    this.pageNumber = 0;
    this.groups = null;
    this.getAllGroup();
  }
  get user() {
    return this.tokenStorage.getUser();
  }

  loadMoreGroup() {
    this.pageNumber++;
    this.getAllGroup();
  }
}
