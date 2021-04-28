import {Component, OnInit} from '@angular/core';
import {EditService} from '../service/edit.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as bcrypt from 'bcryptjs';
import {ConfirmPasswordValidator} from './validation/confirmPassword';
import {LoadingComponent} from '../loading/loading.component';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from "../../service/auth/token-storage";
import {Router} from "@angular/router";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  viewPass = 'fa fa-eye-slash relative password color-orange';
  viewNewPass = 'fa fa-eye-slash relative password color-orange';
  viewConfirmPass = 'fa fa-eye-slash relative password color-orange';
  typePass = 'password';
  typeNewPass = 'password';
  typeConfirmPass = 'password';
  code: number;
  otpOne;
  otpTwo;
  otpThree;
  otpFour;
  otpFive;
  otpSix;
  account;
  messageErrorOldPassword;
  messageErrorNewPassword;
  messageSuccessChangePassword;

  constructor(private editService: EditService,
              private modalService: NgbModal,
              private dialog: MatDialog,
              private tokenStorage: TokenStorageService,
              private router: Router
  ) {
  }

  formChangePassword = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)])
    }, {
      validators: [ConfirmPasswordValidator]
    },
  );

  ngOnInit(): void {
    this.account = this.tokenStorage.getUser().account
  }

  viewPassword() {
    if (this.typePass === 'password') {
      this.viewPass = 'fa fa-eye relative password color-orange';
      this.typePass = 'text';
    } else {
      this.viewPass = 'fa fa-eye-slash relative password color-orange';
      this.typePass = 'password';
    }
  }

  viewNewPassword() {
    if (this.typeNewPass === 'password') {
      this.viewNewPass = 'fa fa-eye relative password color-orange';
      this.typeNewPass = 'text';
    } else {
      this.viewNewPass = 'fa fa-eye-slash relative password color-orange';
      this.typeNewPass = 'password';
    }
  }

  viewConfirmPassword() {
    if (this.typeConfirmPass === 'password') {
      this.viewConfirmPass = 'fa fa-eye relative password color-orange';
      this.typeConfirmPass = 'text';
    } else {
      this.viewConfirmPass = 'fa fa-eye-slash relative password color-orange';
      this.typeConfirmPass = 'password';
    }
  }

  async sendMail() {
    const match = await bcrypt.compare(this.formChangePassword.value.oldPassword, this.account.password);
    if (match) {
      if (this.formChangePassword.value.oldPassword !== this.formChangePassword.value.newPassword) {
        this.code = Math.floor(((Math.random() * 899999) + 100000));
        this.editService.sendMailConfirmChangePassword(this.tokenStorage.getUser().email, this.code).subscribe((data) => {
        });
      }
    }
  }

  async contentChangePassword(content) {
    const match = await bcrypt.compare(this.formChangePassword.value.oldPassword, this.account.password);
    if (match) {
      if (this.formChangePassword.value.oldPassword !== this.formChangePassword.value.newPassword) {
        this.modalService.open(content, {windowClass: 'dark-modal'});
      } else {
        this.messageErrorNewPassword = '*The new password is the same as the old one!!';
        setTimeout(()=>{
          this.messageErrorNewPassword = '';
        },5000)
      }
    } else {
      this.messageErrorOldPassword = '*The password you entered is incorrect !!';
      setTimeout(()=>{
        this.messageErrorOldPassword = '';
      },5000)
    }
  }

  changePassword(formChangePassword) {
    const otp = this.otpOne + this.otpTwo + this.otpThree + this.otpFour + this.otpFive + this.otpSix;
    if (this.code.toString() === otp) {
      this.modalService.dismissAll('Cross click');
      this.openLoading();
      this.editService.changePassword(this.account.accountName, formChangePassword.oldPassword, formChangePassword.newPassword,
        formChangePassword.confirmPassword).subscribe((data) => {
        this.dialog.closeAll();
        this.tokenStorage.logOut();
        this.router.navigateByUrl("/login");
      });
    }
  }

  get oldPassword() {
    return this.formChangePassword.get('oldPassword');
  }

  get newPassword() {
    return this.formChangePassword.get('newPassword');
  }

  get confirmPassword() {
    return this.formChangePassword.get('confirmPassword');
  }

  return() {
    this.messageErrorNewPassword = '';
    this.messageErrorOldPassword = '';
    this.formChangePassword.reset();
  }

  openLoading() {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
  }
}
