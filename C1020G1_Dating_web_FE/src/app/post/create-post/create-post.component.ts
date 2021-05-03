import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from 'rxjs/operators';
import {DomSanitizer} from "@angular/platform-browser";
import { PostService } from 'src/app/service/post.service';
import { TokenStorageService } from 'src/app/service/auth/token-storage';
import {User} from "../../models/user-model";
import {ngxLoadingAnimationTypes} from "ngx-loading";


declare const $: any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public config = {
    animationType: ngxLoadingAnimationTypes.doubleBounce,
    primaryColour: '#006ddd',
    backdropBorderRadius: '3px'
  };

  public formCreatePost: FormGroup;
  public user: User;
  public check: boolean = false;
  public contentTemp: any;
  public fileImage: any;
  public urlImage: Array<string>;
  public message: string;
  public loading = false;


  @Input() idUserWall : number;

  @Input() checkGroup : string;
  isGroup: boolean


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
    this.isGroup = this.checkGroup.includes("group")
  }

  async addNewPost() {

    // this.contentTemp = $(this.finalLocation).data("emojioneArea").getText();
    // this.formCreatePost.get("postContent").setValue(this.contentTemp);
    this.formCreatePost.get("user").setValue(this.user);
    if (this.formCreatePost.get("postContent").value.trim() != '') {
      this.loading = true;
      await this.addImageToFireBase();
      this.check = false;
      let postImage = {
        post: this.formCreatePost.value,
        postImages: this.urlImage
      };
      this.postService.createPost(postImage).subscribe((data) => {
        if(this.postService.postsInService != undefined) {
          this.formCreatePost = this.formBuilder.group({
            postStatus: ['public', [Validators.required]],
            postContent: [''],
            user: [''],
            groupSocial: [null]
          });
          this.formCreatePost.get("postContent").setValue('');
          this.postService.postsInService.unshift(data);
          this.fileImage = [];
        } else {
          this.postService.createNewPosts(data);
        }
        this.loading = false;
      })
    } else {
      this.check = true;
    }
  }

  get postStatus() {
    return this.formCreatePost.get('postStatus');
  }

  importImages(event) {let files = event.target.files;
    if (files) {
      for (let file of files) {
        const name = file.type;
        const size = file.size;
        if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
          if (size <= 1000000) {
            this.message = null;
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.fileImage.push({url: e.target.result, file: file})
            };
            reader.readAsDataURL(file);
          } else {
            return this.message = "Big size!!"
          }
        } else {
          return this.message = 'Not Image!!';
        }
      }
    }
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
        resolve(1)
      });
    });
  }

  deleteUpdateImage(event) {
    let index = event.target.attributes['data-index'].value;
    this.fileImage.splice(index, 1);
  }
}
