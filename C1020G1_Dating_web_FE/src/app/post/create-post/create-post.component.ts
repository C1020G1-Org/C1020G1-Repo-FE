import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from 'rxjs/operators';
import {DomSanitizer} from "@angular/platform-browser";
import { PostService } from 'src/app/service/post.service';
import { TokenStorageService } from 'src/app/service/auth/token-storage';
import {User} from "../../models/user-model";


declare const $: any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public formCreatePost: FormGroup;
  public user: User;
  public check: boolean = false;
  public contentTemp: any;
  public fileImage: any;
  public urlImage: Array<string>;

  constructor(public formBuilder: FormBuilder,
              public postService: PostService,
              public router: Router,
              public storage: AngularFireStorage,
              public dom: DomSanitizer,
              private tokenStorageService : TokenStorageService) {
  }

  ngOnInit(): void {
    this.fileImage = [];
    this.user = this.tokenStorageService.getUser();

    this.formCreatePost = this.formBuilder.group({
      postStatus: ['public', [Validators.required]],
      postContent: [''],
      user: [''],
      groupSocial: [null]
    });
    this.fileImage = [];
    this.urlImage = [];
  }

  async addNewPost() {
    this.contentTemp = $("#myText").data("emojioneArea").getText();
    this.formCreatePost.get("postContent").setValue($("#myText").data("emojioneArea").getText());
    this.formCreatePost.get("user").setValue(this.user);
    if (this.contentTemp != '') {
      await this.addImageToFireBase();
      this.check = false;
      console.log(this.formCreatePost.value);
      let postImage = {
        post: this.formCreatePost.value,
        postImages: this.urlImage
      };
      console.log(postImage);
      console.log(JSON.stringify(postImage));
      console.log('chuan bi vao create post');
      this.postService.createPost(postImage).subscribe((data) => {
        console.log(data);
        this.postService.postsInService.unshift(data);
        console.log(this.postService.postsInService);
        // this.ngOnInit();
      })

      console.log('ra khoi create');
    } else {
      this.check = true;
    }
  }

  get postStatus() {
    return this.formCreatePost.get('postStatus');
  }

  importImages(event) {
  let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.fileImage.push({url: e.target.result, file: file})
        };
        reader.readAsDataURL(file);
      }
    }
    console.log(this.fileImage);
  }

  addImageToFireBase() {
    this.urlImage = [];
    return new Promise(resolve => {
      Promise.all(this.fileImage.map(file =>
        new Promise((resolve) => {
          const name = file.file.name;
          if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
            const fileRef = this.storage.ref(name);
            this.storage.upload(name, file.file).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL()
                  .subscribe((url) => {
                    this.urlImage.push(url);
                    resolve(1);
                  });
              })).subscribe();
          }
        }))).then(() => {
        console.log(this.urlImage);
        resolve(1)
      });
    });
  }

  deleteUpdateImage(event) {
    let index = event.target.attributes['data-index'].value;
    this.fileImage.splice(index, 1);
  }
}
