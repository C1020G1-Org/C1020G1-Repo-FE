import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostServiceService} from "../service/post-service.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {tap} from 'rxjs/operators';
import {finalize} from 'rxjs/operators';
import {map, filter, switchMap, take} from 'rxjs/operators';
import * as firebase from 'firebase';


import {combineLatest} from 'rxjs';
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

  uploads: any[];
  files: Observable<any>;
  allPercentage: Observable<any>;

  constructor(public formBuilder: FormBuilder,
              public postService: PostServiceService,
              public router: Router,
              public afs: AngularFirestore,
              public storage: AngularFireStorage,
              public dom: DomSanitizer) {
  }

  ngOnInit(): void {
    this.files = this.afs.collection('files').valueChanges();

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
    })
  }

  addNewPost() {
    this.contentTemp = $("#myText").data("emojioneArea").getText();
    if (this.contentTemp != '') {
      this.addImageToFireBase();
      this.files = new Observable<any>();
      this.formCreatePost.get("postContent").setValue($("#myText").data("emojioneArea").getText());
      this.formCreatePost.get("user").setValue(this.user);
      console.log(this.formCreatePost.value);
      this.postService.createPost(this.formCreatePost.value).subscribe(data => {
        this.router.navigateByUrl('');
      })
    } else {
      this.check = true;
    }
  }

  get postStatus() {
    return this.formCreatePost.get('postStatus');
  }

  importImages(event) {
    const fileList = event.target.files;
    this.fileImage = event.target.files;
    for (const file of fileList) {
      this.afs.collection('files').add({
        url: URL.createObjectURL(file)
      });
    }
  }

  addImageToFireBase() {
    this.uploads = [];
    console.log(this.fileImage);
    const allPercentage: Observable<number>[] = [];
    for (const file of this.fileImage) {
      const path = `files/${file.name}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed objects with different information. ADAPT THIS ACCORDING to YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };
      //
      // push each upload into the array
      this.uploads.push(uploadTrack);
    }
    this.allPercentage = combineLatest(allPercentage)
      .pipe(
        map((percentages) => {
          let result = 0;
          for (const percentage of percentages) {
            result = result + percentage;
          }
          return result / percentages.length;
        }),
        tap(console.log)
      );
  }
}
