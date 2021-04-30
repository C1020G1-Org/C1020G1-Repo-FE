import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import { PostService } from 'src/app/service/post.service';
import {Post} from "../../models/Post";
import {PostEditImage, PostImage2} from "../../models/PostImage";
declare const $: any;
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnChanges {
  public formEditPost: FormGroup;
  public check: boolean = false;
  public contentTemp: any;
  public updateFileImage: any[];
  public updateUrlImage: Array<string>;

  @Input() public postIDInUrl: number;

  public post: Post;
  public postImages: Array<PostImage2>;
  public deleteImages: Array<PostImage2>;
  public updateImages: Array<PostImage2>;
  public postEditImage: PostEditImage;
  constructor(public formBuilder: FormBuilder,
              public postService: PostService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public storage: AngularFireStorage) {
  }
  ngOnChanges(): void {
  //   this.updateFileImage = [];
  // this.deleteImages = [];
      this.setValue(this.postIDInUrl);
  }
  ngOnInit(): void {
    this.postImages = [];
    this.deleteImages = [];
    this.updateImages = [];
    this.updateFileImage = [];
    this.updateUrlImage = [];
    this.formEditPost = this.formBuilder.group({
      postId: [''],
      postStatus: ['', [Validators.required]],
      postContent: ['', [Validators.required]],
      postPublished: [''],
      user: [''],
      groupSocial: [null]
    });

    //   let postId = this.activatedRoute.snapshot.params['postId'];
    //   this.postService.getPostById(this.postIDInUrl).subscribe(data => {
    //     console.log(data);
    //     this.post = data.post;
    //     this.postImages = data.postImages;
    //     this.formEditPost.get("postContent").setValue(this.post.postContent);
    //     this.formEditPost.setValue(this.post);
    //   });
    //   console.log(this.postImages);
  }
  get postStatus() {
    return this.formEditPost.get('postStatus');
  }
  async editPost() {
    console.log('vao duoc edit post');
    console.log(this.formEditPost.get('postContent').value);
    this.contentTemp = this.formEditPost.get('postContent').value;
    console.log(this.contentTemp);
    if (this.contentTemp != '') {
      this.check = false;
      await this.addImageToFireBase();
      console.log(this.updateUrlImage);
      this.formEditPost.get("postContent").setValue(this.contentTemp);
      console.log(this.formEditPost.value);
      this.updateImages = this.updateUrlImage.map(x => {
        return {
          postImageId: null,
          postId: this.post.postId,
          image: x
        };
      });
      this.postEditImage = {
        post: this.formEditPost.value,
        updateImages: this.updateImages,
        postImages: null,
        deleteImages: this.deleteImages
      };
      console.log(JSON.stringify(this.postEditImage));
      this.postService.updatePost(this.postEditImage).subscribe()
    } else {
      this.check = true;
    }
  }
  updateImage(event) {
    let files: any[];
    files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.updateFileImage.push({url: e.target.result, file: file})
        };
        reader.readAsDataURL(file);
      }
    }
    console.log(this.updateFileImage)
  }
  deleteImage(event) {
    let index = event.target.attributes['data-index'].value;
    this.deleteImages.push(this.postImages.filter(x => x.postImageId == index)[0]);
    this.postImages = this.postImages.filter(x => x.postImageId != index);
    console.log(this.deleteImages);
    console.log(this.postImages);
  }
  deleteUpdateImage(event) {
    let index = event.target.attributes['data-index'].value;
    this.updateFileImage.splice(index, 1);
  }
  addImageToFireBase() {
    return new Promise(resolve => {
      Promise.all(this.updateFileImage.map(file =>
        new Promise((resolve) => {
          const name = file.file.name;
          if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
            const fileRef = this.storage.ref(name);
            this.storage.upload(name, file.file).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL()
                  .subscribe((url) => {
                    this.updateUrlImage.push(url);
                    resolve(1);
                  });
              })).subscribe();
          }
        }))).then(() => {
        console.log(this.updateUrlImage);
        resolve(1)
      });
    });
  }
  setValue(editingPostId : number) {
    if(this.postIDInUrl){
      this.postService.findPostById(editingPostId).subscribe(data => {
        console.log(data);
        this.post = data.post;
        console.log(this.post);
        this.postImages = data.postImages;
        this.formEditPost.setValue(this.post);
        console.log('fdfds');
        console.log(this.formEditPost.get('groupSocial').value);
        // $("#myText").data("emojioneArea").setText(this.post.postContent);
      });
    }

  }
}
