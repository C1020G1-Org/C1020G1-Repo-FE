import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/service/auth/token-storage';
import { ObserverService } from 'src/app/service/observer.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {ParentComment} from "../models/ParentComment";
import {User} from "../models/user-model";
import {CommentService} from "../service/comment.service";
import {PostService} from "../service/post.service";
import {Post} from "../models/Post";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 @Input("parentComments") parentComments : ParentComment[];
 @Input("postFromNewsfeed") post : Post;
 @Output() onEditingParentCommentPicked = new EventEmitter<any>();
 @Output() onDeletingParentCommentPicked = new EventEmitter<any>();
 @Output() onEditingChildCommentPicked = new EventEmitter<any>();
 @Output() onDeletingChildCommentPicked = new EventEmitter<any>();
  childCommentForm : FormGroup;
  user : User ;
  fileMessageImage : string;
  imageUrlFromLocal : string;
  imageFile : File;
  private parentOfchildComment: ParentComment;

  constructor(private commentService : CommentService,
              private tokenStorageService : TokenStorageService,
              private observerService : ObserverService,
              public storage: AngularFireStorage,
              private postService : PostService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.childCommentForm = new FormGroup({
      content : new FormControl(''),
      commentImage : new FormControl(''),
      parentComment : new FormControl(''),
      user : new FormControl('')
    });
  }

  // submit form to create a new child-comment
  async submitChildForm(parentComment : ParentComment){
    this.childCommentForm.get('parentComment').setValue(parentComment);
    this.childCommentForm.get('user').setValue(this.user);

    this.parentOfchildComment = parentComment;

    if(this.imageUrlFromLocal){
      await this.saveImagetoFirebase();
    }

    this.childCommentForm.get('parentComment').value.user.account = null;
    console.log(this.childCommentForm.value);
    this.commentService.createChildComment(this.childCommentForm.value).subscribe(data => {

      this.postService.observeCreatingComment(this.post, this.parentOfchildComment, data);
      this.childCommentForm.reset()
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  //  pass editing-parent-comment to newsfeed-component
  sendEditingParentComment(editingParentComment : any){
    this.onEditingParentCommentPicked.emit(editingParentComment);
  }

  // pass deleting-parent-comment to newsfeed-component
  sendDeletingParentComment(parentCommentId : any){
    this.onDeletingParentCommentPicked.emit(parentCommentId);
  }

  // pass editing-child-comment to newsfeed-component
  sendEditingChildComment(editingChildComment : any){
    this.onEditingChildCommentPicked.emit(editingChildComment);
  }

  // pass deleting-child-comment to newsfeed-component
  sendDeletingChildComment(childCommentId : any){
    this.onDeletingChildCommentPicked.emit(childCommentId);
  }

  // get url of image uploaded from local computer
  getImageFromLocal(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileMessageImage = null;
      const file = event.target.files[0].name;
      if (file.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrlFromLocal = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);

        this.imageFile = event.target.files[0];
      }else{
        this.fileMessageImage = "Image extension must be .png or .jpeg/.jpg";

      }
    }
  }

  // save image to firebase and get url-firebase to child-comment
  saveImagetoFirebase() {
    return new Promise(resolve => {
      const name = this.imageFile.name;
      if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const fileRef = this.storage.ref(name);
        this.storage.upload(name, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.childCommentForm.get('commentImage').setValue(url);
              resolve(1);
            });
          })).subscribe();
      }
    });
  }

  deleteUpdateImage(){
    this.imageUrlFromLocal = null;
  }

}
