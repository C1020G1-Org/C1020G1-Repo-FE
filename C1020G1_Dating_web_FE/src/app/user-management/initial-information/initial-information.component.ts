import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserCreateService} from "../service/user-create.service";
import {UserStorageService} from "../service/user-storage.service";
import {Router} from "@angular/router";
import {atLeastOneCheckboxValidator} from "../validator/atleast.validator";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Favourite, Reason} from "../../models/user-model";

declare const $: any;

@Component({
  selector: 'app-initial-information',
  templateUrl: './initial-information.component.html',
  styleUrls: ['./initial-information.component.css']
})
export class InitialInformationComponent implements OnInit {

  public formInitial: FormGroup;
  public avatar: string = "assets/images/avatar/default-avatar.png";
  public background: string = "assets/images/avatar/default-background.jpg";
  public avatarFile: any = null;
  public backgroundFile: any = null;
  public favourites: Array<Favourite>;
  public reasons: Array<Reason>;
  public fileMessageAvatar: string = null;
  public fileMessageBackground: string = null;
  public messageRegistry: string;
  public isLoggin: boolean;

  constructor(public formBuilder: FormBuilder,
              public userCreate: UserCreateService,
              public userStorage: UserStorageService,
              public router: Router,
              public storage: AngularFireStorage) {
  }

  ngOnInit(): void {

    this.formInitial = this.formBuilder.group({
      avatarUrl: [this.userStorage.user.userAvatar],
      backgroundUrl: [this.userStorage.user.userBackground],
      marriaged: [this.userStorage.user.marriaged, [Validators.required]],
      reason: this.formBuilder.array(this.userStorage.reason
        .filter(r => r != null)
        .map(r => r?.reasonId), atLeastOneCheckboxValidator),
      favourites: this.formBuilder.array(this.userStorage.favourites
        .filter(f => f != null)
        .map(f => f?.favouriteId), atLeastOneCheckboxValidator)
    });
    this.userCreate.getFavourites().subscribe(data => {
      this.favourites = data;
    });
    this.reasons = [
      <Reason>{reasonId: 1, reasonName: "Find friend"},
      <Reason>{reasonId: 2, reasonName: "Communication"},
      <Reason>{reasonId: 3, reasonName: "Financial reason"},
      <Reason>{reasonId: 4, reasonName: "Friend and communication"},
      <Reason>{reasonId: 5, reasonName: "Marriage"},
    ];
    this.avatarFile = this.userStorage.avatarFile;
    this.backgroundFile = this.userStorage.backgroundFile;
    if (this.userStorage.avatar != null) {
      this.avatar = this.userStorage.avatar;
    }
    if (this.userStorage.background != null) {
      this.background = this.userStorage.background;
    }
  }

  onCheckboxChange(e, type: string) {
    const checkArray: FormArray = this.formInitial.get(type) as FormArray;
    checkArray.markAsTouched();

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  saveAvatar() {
    return new Promise(resolve => {
      const name = this.avatarFile.name;
      if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const fileRef = this.storage.ref(name);
        this.storage.upload(name, this.avatarFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.formInitial.value.avatarUrl = url;
              this.userStorage.user.userAvatar = url;
              resolve(1);
            });
          })).subscribe();
      }
    });
  }

  saveBackground() {
    return new Promise((resolve) => {
      const name = this.backgroundFile.name;
      if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const fileRef = this.storage.ref(name);
        this.storage.upload(name, this.backgroundFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL()
              .subscribe((url) => {
                this.formInitial.value.backgroundUrl = url;
                this.userStorage.user.userBackground = url;
                resolve(1);
              });
          })).subscribe();
      }
    });
  }

  showAvatar(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileMessageAvatar = null;
      const file = event.target.files[0].name;
      if (file.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.avatar = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.avatarFile = event.target.files[0];
        return;
      }
      this.fileMessageAvatar = "Avatar image extension must be .png or .jpeg/.jpg";
    }
  }

  showBackground(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileMessageBackground = null;
      const file = event.target.files[0].name;
      if (file.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.background = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.backgroundFile = event.target.files[0];
        return;
      }
      this.fileMessageBackground = "Background image extension must be .png or .jpeg/.jpg"
    }
  }

  async submit() {
    this.messageRegistry="Registration in progress..."
    this.isLoggin= false;
    $('#successModal').modal('toggle');

    this.userStorage.user.marriaged = this.formInitial.value.marriaged;

    this.userStorage.favourites = [];
    for (let id of this.formInitial.value.favourites) {
      this.userStorage.favourites.push(<Favourite>{favouriteId: id, favouriteName: ""})
    }

    this.userStorage.reason = [];
    for (let id of this.formInitial.value.reason) {
      this.userStorage.reason.push(<Reason>{reasonId: id, reasonName: ""})
    }

    this.userStorage.backgroundFile = this.backgroundFile;
    this.userStorage.avatarFile = this.avatarFile;

    this.userStorage.background = this.background;
    this.userStorage.avatar = this.avatar;

    await this.saveAvatar();
    await this.saveBackground();

    this.userCreate.createUser(this.userStorage.backendObject).subscribe(() => {
      this.messageRegistry="Your account is registry successfully!";
      this.isLoggin = true;
      this.userStorage.clear()
    }, (error) => {
      this.userStorage.serverError = error;
      $('#successModal').modal('toggle');
      this.router.navigateByUrl("registration");
    });
    this.userStorage.clearRegis();
  }


  backToRegistration() {
    this.userStorage.backgroundFile = this.backgroundFile;
    this.userStorage.avatarFile = this.avatarFile;
    this.userStorage.background = this.background;
    this.userStorage.avatar = this.avatar;

    this.userStorage.user.marriaged = this.formInitial.value.marriaged;

    this.userStorage.favourites = [];
    for (let id of this.formInitial.value.favourites) {
      this.userStorage.favourites.push(<Favourite>{favouriteId: id, favouriteName: ""})
    }

    this.userStorage.reason = [];
    for (let id of this.formInitial.value.reason) {
      this.userStorage.reason.push(<Reason>{reasonId: id, reasonName: ""})
    }

    this.router.navigateByUrl("registration");
  }

  checkArray(id: number, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == id)
        return true;
    }
    return false;
  }

  goToLogin() {
    this.userStorage.clear()
    this.router.navigateByUrl("login");
  }
}
