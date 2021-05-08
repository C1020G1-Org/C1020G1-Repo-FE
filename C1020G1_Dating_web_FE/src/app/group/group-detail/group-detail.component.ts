
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {GroupService} from "../../service/groups/group.service";
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  public group;
  public isJoin: boolean = false;

  constructor(public groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              public router: Router,
              private title: Title,
              private tokenStorage: TokenStorageService) {
  }
  ngOnInit() {
    console.log("abc");
    this.title.setTitle("Group-detail");
    this.activatedRoute.paramMap.subscribe(data => {
      this.groupService.getGroupById(data.get("id")).subscribe(group => {
        this.group = group;
      });

      this.groupService.getGroupUserByGroupIdAndUserId(data.get("id"), this.user.userId).subscribe(data => {
        this.isJoin = true;
      }, err => {
      });
    });
  }

  get user() {
    return this.tokenStorage.getUser();
  }
}
