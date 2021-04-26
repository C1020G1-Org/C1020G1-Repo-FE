import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildComment } from 'src/app/model/ChildComment';
import { ParentComment } from 'src/app/model/ParentComment';
import { Post } from 'src/app/model/Post';
import { User } from 'src/app/model/User';
import { PostService } from 'src/app/service/post.service';
import { CommentService } from '../../service/comment.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { UserDto } from 'src/app/dto/user-dto';
import { TokenStorageService } from 'src/app/service/auth/token-storage';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 @Input("parentComments") parentComments : ParentComment[];
  childCommentForm : FormGroup;
  user : UserDto ;
  @Output() onParentCommentPicked = new EventEmitter<any>();
 
  
  constructor(private commentService : CommentService,
              private matDialog: MatDialog,
              private tokenStorageService : TokenStorageService) { }
 

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.childCommentForm = new FormGroup({
      content : new FormControl(''),
      commentImage : new FormControl(''),
      parentComment : new FormControl(''),
      user : new FormControl('')
    });
  }

  submitChildForm(parentComment : ParentComment){
    this.childCommentForm.get('parentComment').setValue(parentComment);
    this.childCommentForm.get('user').setValue(this.user);

    console.log(this.childCommentForm.value);

    this.commentService.createChildComment(this.childCommentForm.value).subscribe(data => {
      console.log('ok');
    }, error => console.log(error))
  }

  sendEditParentComment(parentComment : ParentComment){
    this.onParentCommentPicked.emit(parentComment);
  }

  openDeleteDialog(parentCommentId : number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = parentCommentId;
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
  ); 
  }

}
