import {Component, OnInit} from '@angular/core';
import {CommentService} from 'src/app/service/comment.service';
import {PostService} from 'src/app/service/post.service';
import {finalize} from 'rxjs/operators';
import {TokenStorageService} from 'src/app/service/auth/token-storage';
import {FormControl, FormGroup} from '@angular/forms';
import {ObserverService} from 'src/app/service/observer.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {User} from "../models/user-model";
import {ParentComment} from "../models/ParentComment";
import {ChildComment} from "../models/ChildComment";
import {Post} from "../models/Post";

declare const $: any;

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  posts: Post[];
  pageNumber = 0;
  user: User;
  fileMessageImage: string;
  imageUrlFromLocal: string;
  imageFile: File;
  editingPostId: number;

  parentCommentForm: FormGroup;
  editingParentComment: ParentComment;
  deletingParentCommentId: number;

  childCommentForm: FormGroup;
  editingChildComment: ChildComment;
  deletingChildCommentId: number;

  constructor(private postService: PostService,
              private tokenStorageService: TokenStorageService,
              private commentService: CommentService,
              private observerService: ObserverService,
              public storage: AngularFireStorage) {
    // this.observerService.getChangeEvent().subscribe(() =>{
    //   this.getAllPostInNewsFeed(this.user.userId, this.pageNumber);
    // })
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.user.account = null;

    this.parentCommentForm = new FormGroup({
      parentCommentId: new FormControl(''),
      content: new FormControl(''),
      commentImage: new FormControl(''),
      post: new FormControl(''),
      user: new FormControl(''),
      childComments : new FormControl('')
    });

    this.childCommentForm = new FormGroup({
      childCommentId: new FormControl(''),
      content: new FormControl(''),
      commentImage: new FormControl(''),
      user: new FormControl('')
    })

    this.getAllPostInNewsFeed(this.user.userId, this.pageNumber);
  }

  // get all post in newsfeed
  getAllPostInNewsFeed(userId: number, pageNumber: number) {
    this.postService.findAllPostInNewsFeed(userId, pageNumber).subscribe(listPageablePost => {
      console.log('vao duoc newsfeed ')
      if (listPageablePost == null) {
        console.log("end page");
      } else {
        let listPostsFromDb = listPageablePost.content;

        for (let post of listPostsFromDb) {
          post.user.account = null;
          for (let parentComment of post.parentComments) {
            parentComment.user.account = null;
            for (let childComment of parentComment.childComments){
              childComment.user.account = null;
            }
          }
        }

        if (this.postService.postsInService != null) {
          this.postService.postsInService = this.postService.postsInService.concat(listPostsFromDb);
        } else {
          this.postService.postsInService = listPostsFromDb;
        }

      }

      this.posts = this.postService.postsInService;

      console.log(this.postService.postsInService);
    })
  };

  // create function loadmore post in newsfeed
  loadMorePost() {
    this.pageNumber++;
    this.getAllPostInNewsFeed(this.user.userId, this.pageNumber);
  }

  // submit form to create or update parent-comment
  async submitParentForm(post: Post) {
    this.parentCommentForm.get('post').setValue(post);
    this.parentCommentForm.get('user').setValue(this.user);

    if (this.imageUrlFromLocal == null && this.parentCommentForm.get('content').value == '') {
      return;
    }

    if (this.imageUrlFromLocal) {
      await this.saveParentImagetoFirebase();
    }

    console.log(this.parentCommentForm.value);
    // if (this.parentCommentForm.get('post').value.parentComments != null) {
    //   for (let parentComment of this.parentCommentForm.get('post').value.parentComments) {
    //     parentComment.user.account = null;
    //   }
    // }

    this.commentService.createParentComment(this.parentCommentForm.value).subscribe((data) => {
      console.log(data);

      // if(data.post.parentComments != null){
      //   for (let parentComment of data.post.parentComments){
      //     parentComment.user.account = null;
      //   }
      // }

      this.postService.observeCreatingComment(post, data, null);
      this.ngOnInit();
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  // get editing-parent-comment from comment-component
  getEditingParentComment(editingParentComment: any, post: Post) {
    this.imageUrlFromLocal = editingParentComment.commentImage;

    console.log(editingParentComment);

    this.parentCommentForm.get('parentCommentId').setValue(editingParentComment.parentCommentId);
    this.parentCommentForm.get('content').setValue(editingParentComment.content);
    this.parentCommentForm.get('commentImage').setValue(editingParentComment.commentImage);
    this.parentCommentForm.get('post').setValue(post);
    this.parentCommentForm.get('user').setValue(this.user);
    this.parentCommentForm.get('childComments').setValue(editingParentComment.childComments);

    this.editingParentComment = this.parentCommentForm.value;
  }

  // get deleting-parent-comment from comment-component
  getDeletingParentComment(parentCommentId: any) {
    this.deletingParentCommentId = parentCommentId;
  }

  // submit form to update a parent-comment
  async submitEditParentForm() {
    if (this.imageUrlFromLocal) {
      await this.saveParentImagetoFirebase();
    } else {
      this.parentCommentForm.get('commentImage').setValue(null);
    }

    console.log(this.parentCommentForm.value);

    this.commentService.editParentComment(this.editingParentComment.parentCommentId, this.parentCommentForm.value).subscribe((data) => {
      console.log('ok');
      console.log('data');
      console.log(data);
      this.postService.observeEditingComment(data,this.editingParentComment.childComments ,null);
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  // call service to delete parent-comment
  submitDeleteParentComment() {
    this.commentService.deleteParentComment(this.deletingParentCommentId).subscribe(data => {
      console.log('successfully deleted !');
      this.postService.observeDeletingComment(data.parentCommentId, null);
    }, error => console.log(error));
  }

  // get editing-child-comment from comment-component
  getEditingChildComment(editingChildComment: any) {
    this.imageUrlFromLocal = editingChildComment.commentImage;

    this.childCommentForm.get('content').setValue(editingChildComment.content);
    this.childCommentForm.get('childCommentId').setValue(editingChildComment.childCommentId);
    this.childCommentForm.get('commentImage').setValue(editingChildComment.commentImage);
    this.childCommentForm.get('user').setValue(editingChildComment.user);

    this.editingChildComment = this.childCommentForm.value;
  }

  // submit form to update child-comment
  async submitEditchildForm() {
    if (this.imageUrlFromLocal) {
      await this.saveChildImagetoFirebase();
    } else {
      this.childCommentForm.get('commentImage').setValue(null);
    }

    this.childCommentForm.get('user').value.account = null;
    console.log(this.childCommentForm.value);
    this.commentService.editChildComment(this.editingChildComment.childCommentId, this.childCommentForm.value).subscribe((data) => {
      console.log('ok');
      this.postService.observeEditingComment(null, null, data);
      this.imageUrlFromLocal = null;
    }, error => console.log(error))
  }

  // get deleting-child-comment from comment-component
  getDeletingChildComment(childCommentId: any) {
    this.deletingChildCommentId = childCommentId;
  }

  // call service to delete child-comment
  submitDeleteChildComment() {
    this.commentService.deleteChildComment(this.deletingChildCommentId).subscribe(data => {
      console.log('successfully deleted !');
      this.postService.observeDeletingComment(null, data.childCommentId);
    }, error => console.log(error));
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
      } else {
        this.fileMessageImage = "Image extension must be .png or .jpeg/.jpg";

      }
    }
  }

  // save uploaded image to firebase and get firebase-url of that image to parent-comment
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

  // save uploaded image to firebase and get firebase-url of that image to child-comment
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

  deleteUpdateImage() {
    this.imageUrlFromLocal = null;
  }

  // send editing post to edit-post-component
  sendEditPostId(editingPostId: number) {
    this.editingPostId = editingPostId;
  }
}
