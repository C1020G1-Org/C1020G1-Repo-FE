import {Component, OnInit} from '@angular/core';
import {ParentComment} from "../model/ParentComment";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/User";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  parentComments: ParentComment[];
  userLogging: User = {
    userId: 1,
  userName: "string"
,
  birthday: "string"
,
  gender: "string"
,
  occupation: "string"
,
  email: "string"
,
  userAvatar: "string"
,
  userBackground: "string"
,
  marriaged: "string"
,
  ward: null
};

constructor(
  public userService : UserService,
  private activatedRoute: ActivatedRoute,) {}


ngOnInit(): void {
  let id = this.activatedRoute.snapshot.params['id'];
this.userService.findCommentById(id).subscribe(data => {
  this.parentComments = data;
  console.log(this.parentComments)
});
  }
}
