import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type = 'password'
  classPassword = 'fa fa-eye-slash relative color-orange'
  constructor() { }

  ngOnInit(): void {
  }

  viewPassword() {
    if (this.type === 'password'){
      this.type = 'text'
      this.classPassword = 'fa fa-eye relative color-orange'
    }else {
      this.type = 'password'
      this.classPassword = 'fa fa-eye-slash relative color-orange'
    }
  }
}
