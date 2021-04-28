import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {EditService} from '../service/edit.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material/dialog';
import {WebcamComponent} from '../webcam/webcam.component';
import {LoadingComponent} from '../loading/loading.component';
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent implements OnInit {

  selectedImage: any = null;
  selectedBackground: any = null;
  avatar;
  background;
  messageAvatarError;
  messageBackground;
  messageUpdateSuccessful;

  constructor(private editService: EditService,
              private modalService: NgbModal,
              private storage: AngularFireStorage,
              public dialog: MatDialog,
              private tokenStorage: TokenStorageService) {
  }

  public user;

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    console.log(this.user)
    this.avatar = this.user.userAvatar;
    this.background = this.user.userBackground;
  }

  openWindowAvatar(content) {
    if (this.selectedImage !== null) {
      const name = this.selectedImage.name;
      const stringImage = name.substring(name.length - 3).toLowerCase();
      if (stringImage === 'png' || stringImage === 'jpg') {
        this.modalService.open(content, {windowClass: 'dark-modal'});
      }
    }
  }

  openWindowBackground(content) {
    const name = this.selectedBackground.name;
    const stringImage = name.substring(name.length - 3).toLowerCase();
    if (stringImage === 'png' || stringImage === 'jpg') {
      this.modalService.open(content, {windowClass: 'dark-modal'});
    }
  }

  saveImage() {
    const name = this.selectedImage.name;
    const stringImage = name.substring(name.length - 3).toLowerCase();
    if (stringImage === 'png' || stringImage === 'jpg') {
      const fileRef = this.storage.ref(name);
      this.openLoading();
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
              this.editService.updateAvatar(this.user.userId, url, stringImage).subscribe((data) => {
                this.tokenStorage.saveUser(data);
                this.messageUpdateSuccessful = 'Successful avatar update !';
                this.selectedImage = '';
              });
            }
          );
        })).subscribe();
    }
  }

  showImage(image) {
    this.messageUpdateSuccessful = '';
    this.messageBackground = '';
    this.messageAvatarError = '';
    if (image.target.files && image.target.files[0]) {
      const file = image.target.files[0].name;
      const path = file.substring(file.length - 3).toLowerCase();
      if (path === 'png' || path === 'jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => this.avatar = e.target.result;
        reader.readAsDataURL(image.target.files[0]);
        this.selectedImage = image.target.files[0];
      } else {
        this.messageAvatarError = 'Error image invalid (file.PNG or file.JPG) !';
      }
    } else {
      this.avatar = this.user.avatar;
      this.selectedImage = null;
    }
  }

  showBackGround(background) {
    this.messageUpdateSuccessful = '';
    this.messageAvatarError = '';
    this.messageBackground = '';
    if (background.target.files && background.target.files[0]) {
      const file = background.target.files[0].name;
      const path = file.substring(file.length - 3).toLowerCase();
      if (path === 'png' || path === 'jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => this.background = e.target.result;
        reader.readAsDataURL(background.target.files[0]);
        this.selectedBackground = background.target.files[0];
        console.log(file);
      } else {
        this.messageBackground = 'Error image invalid (file.PNG or file.JPG) !';
      }
    } else {
      this.background = this.user.background;
      this.selectedBackground = null;
    }
  }

  changeSizeImage(event) {
    document.getElementById('image').style.webkitTransform = 'scale(' + ((event.target.value / 100) + 1) + ')';
  }

  saveBackground() {
    const name = this.selectedBackground.name;
    const stringImage = name.substring(name.length - 3).toLowerCase();
    if (stringImage === 'png' || stringImage === 'jpg') {
      const fileRef = this.storage.ref(name);
      this.openLoading();
      this.storage.upload(name, this.selectedBackground).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
              setTimeout(() => {
                this.editService.updateBackground(this.user.userId, url, stringImage).subscribe((data) => {
                  this.tokenStorage.saveUser(data);
                  this.messageUpdateSuccessful = 'Successful background update !';
                  this.selectedBackground = '';
                  this.ngOnInit();
                });
              });
            }
          );
        })).subscribe();
    }
  }

  return() {
    this.selectedImage = '';
    this.selectedBackground = '';
    this.messageUpdateSuccessful = '';
    this.messageAvatarError = '';
    this.messageBackground = '';
    this.ngOnInit();
  }

  removeImage() {
    const imageDf = 'https://firebasestorage.googleapis.com/v0/b/project-4584214944750813303.appspot.com/o/userProject.png?alt=media&token=4a21ef0d-f9ab-425e-adfa-8304926d39e80';
    this.editService.updateAvatar(this.user.userId, imageDf, 'png').subscribe((data) => {
      this.messageUpdateSuccessful = 'Successful avatar remove !';
      this.ngOnInit();
    });
  }

  openWindowRemoveImage(content3) {
    if (this.user.avatar !== 'https://firebasestorage.googleapis.com/v0/b/project-4584214944750813303.appspot.com/o/userProject.png?alt=media') {
      this.modalService.open(content3, {windowClass: 'dark-modal'});
    }
  }

  openWebcam() {
    const dialogRef = this.dialog.open(WebcamComponent, {
      width: '800px',
      height: '640px',
      disableClose: true,
      data: {dataUI: this.user.userId},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openLoading() {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.dialog.closeAll();
    }, 2000);
  }

  showInfoBackground(content4) {
    this.modalService.open(content4, {windowClass: 'dark-modal'});
  }

  showInfoAvatar(content5) {
    this.modalService.open(content5, {windowClass: 'dark-modal'});
  }
}
