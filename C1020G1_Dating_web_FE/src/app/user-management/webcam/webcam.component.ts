import {Component, Inject, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, of, Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AngularFireStorage} from '@angular/fire/storage';
import {EditService} from "../service/edit.service";
import {finalize} from "rxjs/operators";
import {LoadingComponent} from "../loading/loading.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../../service/auth/token-storage";



@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
  showWebcam = true;
  isCameraExist = true;

  errors: WebcamInitError[] = [];
  image;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  typeClass = 'off';
  avatar: any;

  constructor(private dialogRef: MatDialogRef<WebcamComponent>,
              private storage: AngularFireStorage,
              private editService: EditService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialog: MatDialog,
              private ngbModal: NgbModal,
              private tokenStorage: TokenStorageService
                ) {
  }
  userId: number;
  ngOnInit(): void {
    this.userId=this.data.dataUI;
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });
  }

  takeSnapshot(): void {
    this.trigger.next();
  }

  return() {
    this.image = undefined;
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
  }

  handleImage(webcamImage: WebcamImage) {
    this.image = webcamImage.imageAsBase64;
    this.typeClass = 'on';
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  close() {
    this.dialogRef.close();
  }

  saveAvatar(image) {
    const arrayFileImage = image.toString().split(';');
    const arrayFileImageFirst = arrayFileImage[1].split(',');
    const fileName = Date.now().toString();
    const storageRef = this.storage.ref(fileName);
    this.openLoading();
    storageRef.putString(arrayFileImageFirst[1], 'base64', {contentType: 'image/jpeg'}).snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL().subscribe((url)=>{
          this.editService.updateAvatar(this.userId, url, 'png').subscribe((data) => {
            this.tokenStorage.saveUser(data)
            this.dialog.closeAll();
          });
        })
      })
    ).subscribe();
  }
  openConfirmSaveImage(content){
    this.ngbModal.open(content,{windowClass: 'dark-modal'})
  }

  openLoading() {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    // setTimeout(() => {
    //   this.dialog.closeAll();
    // }, 1500);
  }

}
