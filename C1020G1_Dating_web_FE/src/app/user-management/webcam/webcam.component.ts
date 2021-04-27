import {Component, EventEmitter, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {EditService} from '../service/edit.service';
import {AngularFireStorage} from '@angular/fire/storage';


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

  constructor(private dialogRef: MatDialogRef<WebcamComponent>,
              private editService: EditService,
              private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
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
    console.log('abc');
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
    this.dialogRef.close();
  }
}
