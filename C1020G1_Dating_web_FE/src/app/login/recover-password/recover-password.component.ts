import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../service/auth/account-service";
import {LoadingComponent} from "../../user-management/loading/loading.component";
import {MatDialog} from "@angular/material/dialog";
import {$} from "protractor";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm: FormGroup;

  notification: string;

  checkSuccess: string;

  constructor(private form: FormBuilder,
              private accountService: AccountService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.recoverForm = this.form.group({
      accountName: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.accountService.recoverPage(this.recoverForm.get("accountName").value).subscribe(data => {
        let notification = "We have sent a new password to your Gmail";
        this.openLoading(notification,"success");

      },
      error => {
        this.openLoading(error.error.text,"false");

      })
  }


  openLoading(notification, checkSuccess) {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.dialog.closeAll();
      this.notification = notification
      this.checkSuccess = checkSuccess
    }, 1000);



  }
}
