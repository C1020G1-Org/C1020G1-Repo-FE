import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/auth/authentication-service";
import {AccountService} from "../../service/auth/account-service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm: FormGroup;

  constructor(private form: FormBuilder,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.recoverForm = this.form.group({
      accountName: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.accountService.recoverPage(this.recoverForm.get("accountName").value).subscribe(data =>{
      console.log("đã send")
    })
  }
}
