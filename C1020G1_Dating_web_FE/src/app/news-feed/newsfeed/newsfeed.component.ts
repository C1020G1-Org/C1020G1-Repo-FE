import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { ParentComment } from 'src/app/model/ParentComment';
import { Post } from 'src/app/model/Post';
import { PostService } from 'src/app/service/post.service';
import { flatMap, map, mergeMap } from 'rxjs/operators';
import { AccountService } from 'src/app/service/auth/account-service';
import { UserDto } from 'src/app/dto/user-dto';
import { TokenStorageService } from 'src/app/service/auth/token-storage';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit, OnChanges {
  posts : Post[];
  pageNumber = 0;
  user : UserDto;
  parentCommentForm : FormGroup;
  editingParentComment : ParentComment;

  constructor(private postService : PostService,
              private tokenStorageService : TokenStorageService,
              private commentService : CommentService) { }
  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.posts){
    //   this.
    // }
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.parentCommentForm = new FormGroup({
      content : new FormControl(''),
      commentImage : new FormControl(''),
      post : new FormControl(''),
      user : new FormControl('')
    });

    this.getAllPostInNewsFeed(2,this.pageNumber);

    
  }

  getAllPostInNewsFeed(userId : number, pageNumber : number){
    this.postService.findAllPostInNewsFeed(userId,pageNumber).subscribe(listPageablePost =>{
      let listPostsFromDb = listPageablePost.content;
      
      if(this.posts != null){
        this.posts = this.posts.concat(listPostsFromDb);
      }else {
        this.posts = listPostsFromDb;
      }
    })                    
  };

  loadMorePost() {
    this.pageNumber ++;
    this.getAllPostInNewsFeed(2,this.pageNumber);
  }

  submitParentForm(post : Post){
    this.parentCommentForm.get('post').setValue(post);
    this.parentCommentForm.get('user').setValue(this.user);

    console.log(this.parentCommentForm.value);

    this.commentService.createParentComment(this.parentCommentForm.value).subscribe(() =>{
      console.log('ok');
    }, error => console.log(error))
  }

  onEditParentComment(editingParentComment : any){
    console.log(editingParentComment);

    this.editingParentComment = editingParentComment;
  }

  submitEditParentForm(){
    console.log(this.parentCommentForm.value);

    this.commentService.editParentComment(this.editingParentComment.parentCommentId, this.parentCommentForm.value).subscribe(() =>{
      console.log('ok');
    }, error => console.log(error))
  }
}
