import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { ParentComment } from 'src/app/model/ParentComment';
import { Post } from 'src/app/model/Post';
import { PostService } from 'src/app/service/post.service';
import { finalize, flatMap, map, mergeMap } from 'rxjs/operators';
import { AccountService } from 'src/app/service/auth/account-service';
import { UserDto } from 'src/app/dto/user-dto';
import { TokenStorageService } from 'src/app/service/auth/token-storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildComment } from 'src/app/model/ChildComment';
import { ObserverService } from 'src/app/service/observer.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit{
  posts : Post[];
  pageNumber = 0;
  user : UserDto;
  parentCommentForm : FormGroup;
  childCommentForm : FormGroup;
  editingParentComment : ParentComment;
  deletingParentCommentId : number;
  editingChildComment : ChildComment;
  deletingChildCommentId : number;
  fileMessageImage : string;
  imageUrlFromLocal : string;
  imageFile : File;


  constructor(private postService : PostService,
              private tokenStorageService : TokenStorageService,
              private commentService : CommentService,
              private observerService : ObserverService,
              public storage: AngularFireStorage) { 
                // this.observerService.getChangeEvent().subscribe(() =>{
                //   this.getAllPostInNewsFeed(this.user.userId, this.pageNumber);
                // })
              }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.parentCommentForm = new FormGroup({
      parentCommentId : new FormControl(''),
      content : new FormControl(''),
      commentImage : new FormControl(''),
      post : new FormControl(''),
      user : new FormControl('')
    });

    this.childCommentForm = new FormGroup({
      childCommentId : new FormControl(''),
      content : new FormControl(''),
      commentImage : new FormControl(''),
      user : new FormControl('')
    })

    this.getAllPostInNewsFeed(this.user.userId,this.pageNumber);

    
  }

  getAllPostInNewsFeed(userId : number, pageNumber : number){
    this.postService.findAllPostInNewsFeed(userId,pageNumber).subscribe(listPageablePost =>{
      let listPostsFromDb = listPageablePost.content;
      
      if(this.posts != null){
        this.posts = this.posts.concat(listPostsFromDb);
      }else {
        this.posts= listPostsFromDb;
      }
      
      console.log(this.posts);

    })                    
  };

  loadMorePost() {
    this.pageNumber ++;
    this.getAllPostInNewsFeed(this.user.userId,this.pageNumber);
  }

  async submitParentForm(post : Post){
    this.parentCommentForm.get('post').setValue(post);
    this.parentCommentForm.get('user').setValue(this.user);

    console.log(this.imageUrlFromLocal);

    if(this.imageUrlFromLocal){
      await this.saveParentImagetoFirebase();
    }

    console.log(this.parentCommentForm.value);

    this.commentService.createParentComment(this.parentCommentForm.value).subscribe(() =>{
      console.log('ok');
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  getEditingParentComment(editingParentComment : any, post : Post){
    // console.log(editingParentComment);

    this.imageUrlFromLocal = editingParentComment.commentImage;


    this.parentCommentForm.get('parentCommentId').setValue(editingParentComment.parentCommentId);
    this.parentCommentForm.get('content').setValue(editingParentComment.content);
    this.parentCommentForm.get('commentImage').setValue(editingParentComment.commentImage);
    this.parentCommentForm.get('post').setValue(post);
    this.parentCommentForm.get('user').setValue(this.user);

    this.editingParentComment = this.parentCommentForm.value;
    console.log(this.editingParentComment);
  }

  async submitEditParentForm(){
    console.log(this.parentCommentForm.value);

    if(this.imageUrlFromLocal){
      await this.saveParentImagetoFirebase();
    }

    this.commentService.editParentComment(this.editingParentComment.parentCommentId, this.parentCommentForm.value).subscribe(() =>{
      console.log('ok');
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  getDeletingParentComment(parentCommentId : any){
    this.deletingParentCommentId = parentCommentId;
  }

  submitDeleteParentComment(){
    // console.log('deleting :' + this.deletingParentCommentId);

    this.commentService.deleteParentComment(this.deletingParentCommentId).subscribe(data => {
      console.log('successfully deleted !');
    }, error => console.log(error));

  }

  getEditingChildComment(editingChildComment : any){
    console.log(editingChildComment);

    this.imageUrlFromLocal = editingChildComment.commentImage;


    this.childCommentForm.get('content').setValue(editingChildComment.content);
    this.childCommentForm.get('childCommentId').setValue(editingChildComment.childCommentId);
    this.childCommentForm.get('commentImage').setValue(editingChildComment.commentImage);
    this.childCommentForm.get('user').setValue(editingChildComment.user);

    this.editingChildComment = this.childCommentForm.value;
    console.log(this.editingChildComment);

  }

  async submitEditchildForm(){
    console.log(this.childCommentForm.value);
    await this.saveChildImagetoFirebase();
    

    this.commentService.editChildComment(this.editingChildComment.childCommentId, this.childCommentForm.value).subscribe(() =>{
      console.log('ok');
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  getDeletingChildComment(childCommentId : any){
    this.deletingChildCommentId = childCommentId;
  }

  submitDeleteChildComment(){
    console.log(this.deletingChildCommentId);
    
    this.commentService.deleteChildComment(this.deletingChildCommentId).subscribe(data => {
      console.log('successfully deleted !');
    }, error => console.log(error));

  }

  getImageFromLocal(event) {
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
  }

  saveParentImagetoFirebase() {
    return new Promise(resolve => {
      const name = this.imageFile.name;
      if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const fileRef = this.storage.ref(name);
        this.storage.upload(name, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.parentCommentForm.get('commentImage').setValue(url);
              resolve(1);
            });
          })).subscribe();
      }
    });
  }

  saveChildImagetoFirebase() {
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
