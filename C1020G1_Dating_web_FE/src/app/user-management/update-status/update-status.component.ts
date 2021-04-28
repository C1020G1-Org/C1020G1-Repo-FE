import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EditService} from '../service/edit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingComponent} from '../loading/loading.component';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from "../../service/auth/token-storage";

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  constructor(private editService: EditService,
              private route: Router,
              private router: ActivatedRoute,
              private modalService: NgbModal,
              private dialog: MatDialog,
              private tokenStorage: TokenStorageService) {
  }

  valueStatus;
  updateStatus;
  statusId;
  user;
  messageStatus;
  messageUpdateSuccessful;
  checkSave = false;

  openWindowCustomClass(content) {
    if (this.updateStatus.value.radio !== this.statusId) {
      switch (this.updateStatus.value.radio) {
        case 1:
          this.valueStatus = 'Online';
          this.messageStatus = 'With this status update, everyone will see you\'re up and running.';
          break;
        case 2:
          this.valueStatus = 'Busy';
          this.messageStatus = 'This tells everyone that you\'ve been busy for a while.';
          break;
        case 3:
          this.valueStatus = 'Offline';
          this.messageStatus = 'This will cause people to see that you are inactive on the website.';
          break;
        default:
      }
      this.modalService.open(content, {windowClass: 'dark-modal'});
    }
  }

  ngOnInit(): void {
        this.user = this.tokenStorage.getUser();
        this.statusId = this.user.status.statusId;
        this.updateStatus = new FormGroup(
          {
            radio: new FormControl(this.user.status.statusId, [Validators.max(3), Validators.min(1)])
          }
        );
      }

  updateStatusUser() {
    console.log(this.updateStatus.value.radio);
    if (this.updateStatus.value.radio <= 3 && this.updateStatus.value.radio > 0) {
      this.openLoading();
      this.editService.updateStatusUser(this.user.userId, this.updateStatus.value.radio).subscribe(data => {
        this.tokenStorage.saveUser(data)
        this.ngOnInit();
        setTimeout(() => {
          this.messageUpdateSuccessful = '';
        }, 5000);
      });
    }
  }

  return() {
    this.messageUpdateSuccessful = '';
    this.ngOnInit();
  }
  openLoading() {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.messageUpdateSuccessful = 'Update Status ' + this.valueStatus + ' Successful !';
      this.dialog.closeAll();
    }, 2000);
  }
}
