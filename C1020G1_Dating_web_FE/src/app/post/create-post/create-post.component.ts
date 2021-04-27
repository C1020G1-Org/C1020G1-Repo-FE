import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostServiceService} from "../service/post-service.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from 'rxjs/operators';
import {DomSanitizer} from "@angular/platform-browser";


declare const $: any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public formCreatePost: FormGroup;
  public user: {};
  public check: boolean = false;
  public contentTemp: any;
  public fileImage: any;
  public urlImage: Array<string>;

  constructor(public formBuilder: FormBuilder,
              public postService: PostServiceService,
              public router: Router,
              public storage: AngularFireStorage,
              public dom: DomSanitizer) {
  }

  ngOnInit(): void {
    this.fileImage = [];
    this.user = {
      userId: 1,
      userName: "son",
      birthday: "1997-10-24",
      gender: "Nam",
      occupation: "student",
      address: "tay ninh",
      email: "son@gmail.com",
      userAvatar: "bac.png",
      userBackground: "abc.png",
      marriaged: "No",
      ward: {
        wardId: 3,
        district: {
          districtId: 3,
          province: {
            provinceId: 1,
            provinceName: "danang"
          },
          districtName: "lienchieu"
        },
        wardName: "abc"
      },
      status: {
        statusId: 1,
        statusName: "online"
      },
      account: {
        accountId: 1,
        accountName: "account_1",
        password: "123456"
      }
    };

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
      this.postService.createPost(postImage).subscribe(data => {
        this.ngOnInit();
      })
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
    console.log(this.fileImage)
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
    this.fileImage = this.fileImage.slice(0, index).concat(this.fileImage.slice(index + 1, this.fileImage.length));
    console.log(this.fileImage);
  }
}
