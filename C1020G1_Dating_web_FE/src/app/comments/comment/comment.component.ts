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
import { ObserverService } from 'src/app/service/observer.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 @Input("parentComments") parentComments : ParentComment[];
 @Output() onEditingParentCommentPicked = new EventEmitter<any>();
 @Output() onDeletingParentCommentPicked = new EventEmitter<any>();
 @Output() onEditingChildCommentPicked = new EventEmitter<any>();
 @Output() onDeletingChildCommentPicked = new EventEmitter<any>();
  childCommentForm : FormGroup;
  user : UserDto ;
  fileMessageImage : string;
  imageUrlFromLocal : string;
  imageFile : File;
 
  constructor(private commentService : CommentService,
              private matDialog: MatDialog,
              private tokenStorageService : TokenStorageService,
              private observerService : ObserverService,
              public storage: AngularFireStorage) { }
 
  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.childCommentForm = new FormGroup({
      content : new FormControl(''),
      commentImage : new FormControl(''),
      parentComment : new FormControl(''),
      user : new FormControl('')
    });
  }

  async submitChildForm(parentComment : ParentComment){
    this.childCommentForm.get('parentComment').setValue(parentComment);
    this.childCommentForm.get('user').setValue(this.user);

    if(this.imageUrlFromLocal){
      await this.saveImagetoFirebase();
    }

    console.log(this.childCommentForm.value);

    this.commentService.createChildComment(this.childCommentForm.value).subscribe(data => {
      console.log('ok');
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  sendEditingParentComment(editingParentComment : any){
    console.log(editingParentComment);
    this.onEditingParentCommentPicked.emit(editingParentComment);
  }

  sendDeletingParentComment(parentCommentId : any){
    this.onDeletingParentCommentPicked.emit(parentCommentId);
  }

  sendEditingChildComment(editingChildComment : any){
    console.log(editingChildComment);
    this.onEditingChildCommentPicked.emit(editingChildComment);
  }

  sendDeletingChildComment(childCommentId : any){
    this.onDeletingChildCommentPicked.emit(childCommentId);
  }

  getImageFromLocal(event) {
    console.log('ok1');

    if (event.target.files && event.target.files[0]) {
      this.fileMessageImage = null;
      const file = event.target.files[0].name;
      if (file.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imageUrlFromLocal = e.target.result;
          console.log(this.imageUrlFromLocal);
          console.log('done')  ;
        }
        reader.readAsDataURL(event.target.files[0]);

        this.imageFile = event.target.files[0];
      }else{
        this.fileMessageImage = "Image extension must be .png or .jpeg/.jpg";

      }
    }

    console.log(this.imageFile);
    
    console.log('ok2');
  }

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

}
