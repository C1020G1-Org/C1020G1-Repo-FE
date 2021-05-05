import {Component, Input, OnInit} from '@angular/core';
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
import {UserService} from "../wall/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../service/groups/group.service";

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

  idUserWall : number;

  idGroup: number;

  route: string
  noData: boolean;
  timeEdit: string;

  constructor(private postService: PostService,
              private tokenStorageService: TokenStorageService,
              private commentService: CommentService,
              private observerService: ObserverService,
              public storage: AngularFireStorage,
              public userService: UserService,
              public router: Router,
              private activateRouter: ActivatedRoute,
              private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.parentCommentForm = new FormGroup({
      parentCommentId: new FormControl(''),
      content: new FormControl(''),
      commentImage: new FormControl(''),
      post: new FormControl(''),
      user: new FormControl(''),
      childComments: new FormControl(null)
    });

    this.childCommentForm = new FormGroup({
      childCommentId: new FormControl(''),
      content: new FormControl(''),
      commentImage: new FormControl(''),
      user: new FormControl('')
    })

     this.route = this.router.url

    if (this.route.includes("newsfeed")) {
      this.getAllPostInNewsFeed(this.user.userId, this.pageNumber, "newsfeed");
      this.idUserWall = 0;
    }

    if (this.route.includes("wall")){
      this.idUserWall = this.activateRouter.snapshot.params['id'];
      this.getAllPostInNewsFeed(this.idUserWall, this.pageNumber, "wall");

    }

    if (this.route.includes("group")){
      this.idGroup = this.activateRouter.snapshot.params['id'];
      console.log(this.idGroup)
      this.getAllPostInNewsFeed(this.idGroup, this.pageNumber, "group");

    }


  }

  // get all post in newsfeed
  getAllPostInNewsFeed(id: number, pageNumber: number, checkUrl) {
    if (checkUrl == "newsfeed") {
      this.postService.findAllPostInNewsFeed(id, pageNumber).subscribe(listPageablePostNewsFeed => {
        this.extracted(listPageablePostNewsFeed);
      })
    }
    if (checkUrl == "wall"){
      this.postService.findAllPostInWall(id, pageNumber).subscribe(listPageablePostWall => {
        this.extracted(listPageablePostWall);
      })
    }
    if (checkUrl == "group") {
      this.groupService.getAllPostGroup(id, pageNumber).subscribe(listPageablePostGroup => {
        this.extracted(listPageablePostGroup)
      })
    }

  };

  private extracted(listPageablePost) {
    if(listPageablePost == null){
      this.noData = true;
      return;
    }else {
      let listPostsFromDb = listPageablePost.content;

      for (let post of listPostsFromDb) {
        post.user.account = null;
        for (let parentComment of post.parentComments) {
          parentComment.user.account = null;
          for (let childComment of parentComment.childComments) {
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
  }

// create function loadmore post in newsfeed
  loadMorePost() {
    this.pageNumber++;
    if (this.route.includes("newsfeed")) {
      this.getAllPostInNewsFeed(this.user.userId, this.pageNumber, "newsfeed");
    }

    if (this.route.includes("wall")){
      this.getAllPostInNewsFeed(this.idUserWall, this.pageNumber, "wall");
    }

    if (this.route.includes("group")){
      this.getAllPostInNewsFeed(this.idGroup, this.pageNumber, "group");
    }


  }

  // submit form to create or update parent-comment
  async submitParentForm(post: Post) {
    this.parentCommentForm.get('post').setValue(post);
    this.parentCommentForm.get('user').setValue(this.user);
    this.parentCommentForm.controls.content.setValue(this.parentCommentForm.get("content").value.trim())

    if (this.imageUrlFromLocal == null && this.parentCommentForm.get('content').value == '') {
      return;
    }

    if (this.imageUrlFromLocal) {
      await this.saveParentImagetoFirebase();
    }

    this.commentService.createParentComment(this.parentCommentForm.value).subscribe((data) => {
      this.postService.observeCreatingComment(post, data, null);
      this.parentCommentForm.reset();
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


    this.commentService.editParentComment(this.editingParentComment.parentCommentId, this.parentCommentForm.value).subscribe((data) => {
      console.log(data)
      this.postService.observeEditingComment(data, this.editingParentComment.childComments, null);
      this.parentCommentForm.reset();
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

  logout() {
    this.tokenStorageService.logOut();
    window.location.reload();
  }
}
