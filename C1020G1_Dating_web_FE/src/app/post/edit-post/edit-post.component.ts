import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostServiceService} from "../service/post-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../post.module";

declare const $: any;

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public formEditPost: FormGroup;
  public check: boolean = false;
  public contentTemp: any;

  public post: Post;

  constructor(public formBuilder: FormBuilder,
              public postService: PostServiceService,
              public router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formEditPost = this.formBuilder.group({
      postId:[''],
      postStatus: ['', [Validators.required]],
      postContent: ['', [Validators.required]],
      postPublished: [''],
      user: [''],
      groupSocial: ['']
    });

    let postId = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostById(postId).subscribe(data => {
      this.post = data;
      this.formEditPost.get("postContent").setValue(this.post.postContent);
      this.formEditPost.setValue(data);
    })
  }



  get postStatus() {
    return this.formEditPost.get('postStatus');
  }

  editPost() {
    this.contentTemp = $("#myText").data("emojioneArea").getText();
    if (this.contentTemp != '') {
      this.check = false;
      this.formEditPost.get("postContent").setValue($("#myText").data("emojioneArea").getText());
      console.log(this.formEditPost.value);
      this.post = this.formEditPost.value;
      this.postService.updatePost(this.formEditPost.value).subscribe(data => {
        // this.formEditPost.get("postContent").setValue($("#myText").data("emojioneArea").getText());
        // this.router.navigateByUrl('post-edit/'+ this.post.postId);
        this.ngOnInit();
      })
    } else {
      this.check = true;
    }
  }

  // getImageFromFireBase(){
  //   const path = `files`;
  //   const ref = this.storage.ref(path);
  // }
}
