import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/auth/authentication-service";
import {TokenStorageService} from "../../service/auth/token-storage";
import {Account} from "../../service/auth/account";
import {ActivatedRoute, Router} from "@angular/router";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {JwtResponse} from "../../service/auth/JwtResponse";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type = 'password'
  classPassword = 'fa fa-eye-slash relative color-orange'
  loginForm: FormGroup;
  account: Account;
  title = "Sign In Now And Meet The Awesome Friends Around The World.";
  socialUser: SocialUser;
  userLogged: SocialUser;
  isError = false;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService,
              private form: FormBuilder,
              private tokenStorage: TokenStorageService,
              private authService: SocialAuthService) {
  }

  ngOnInit(): void {

    this.loginForm = this.form.group({
      accountName: ['', [Validators.required, Validators.pattern("^[0-9A-Za-z]*$")]],
      password: ['', Validators.required],
      remember: false
    });

    this.checkLogin();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      const tokenGoogle = new JwtResponse(this.socialUser.idToken)
      console.log(data)
      this.auth.google(tokenGoogle).subscribe(req => {
          if (req.token == "") {
            this.tokenStorage.saveUser(req.user);
            this.router.navigateByUrl("/registration");
          } else {
            this.tokenStorage.saveToken(req.token);
            this.tokenStorage.saveUser(req.user);
            this.tokenStorage.saveAccountName(req.accountName);
            this.router.navigateByUrl("/home");
          }
        },
        error => {
          console.log(error);
          this.logOut()
        })
    }).catch(
      err => {
        console.log(err)
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      const tokenFacebook = new JwtResponse(this.socialUser.authToken)
      this.auth.facebook(tokenFacebook).subscribe(req => {
          if (req.token == "") {
            this.tokenStorage.saveUser(req.user);
            this.router.navigateByUrl("/registration");
          } else {
            this.tokenStorage.saveToken(req.token);
            this.tokenStorage.saveUser(req.user);
            this.tokenStorage.saveAccountName(req.accountName);
            this.router.navigateByUrl("/home");
          }

        },
        error => {
          console.log(error);
          this.logOut()
        }
      )
    }).catch(
      err => {
        console.log(err)
      }
    );
  }

  logOut(): void {
    this.authService.signOut().then(
      data => {
        this.tokenStorage.logOut();
        this.router.navigateByUrl("/login")
      }
    );
  }


  checkLogin() {
    if (this.tokenStorage.isLogged()) {
      this.router.navigateByUrl("/home")
    }
  }


  viewPassword() {
    if (this.type === 'password') {
      this.type = 'text'
      this.classPassword = 'fa fa-eye relative color-orange'
    } else {
      this.type = 'password'
      this.classPassword = 'fa fa-eye-slash relative color-orange'
    }
  }

  onSubmit() {
    this.account = new Account(this.getAccountName().value, this.getPassword().value);
    this.loginWithCheckRemember(this.account);
  }

  getAccountName() {
    return this.loginForm.get("accountName");
  }

  getPassword() {
    return this.loginForm.get("password");
  }

  loginWithCheckRemember(accountReg) {
    if (!this.loginForm.get("remember").value) {
      this.auth.sendLogin(accountReg).subscribe(data => {
        this.tokenStorage.saveUser(data.user);
        this.login(data)
      })
    } else {
      this.auth.sendLogin(accountReg).subscribe(data => {
        this.tokenStorage.saveUser(data.user);
        this.loginRemember(data);

      })
    }
  }

  login(data) {
    if (data.token != "INVALID_CREDENTIALS") {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveAccountName(this.getAccountName().value);
      this.router.navigateByUrl("/home");
    } else {
      this.title = "Your account is not correct, please check your username or password";
      this.isError = true;
    }
  }

  loginRemember(data) {
    if (data.token != "INVALID_CREDENTIALS") {
      this.tokenStorage.saveTokenRemember(data.token);
      this.tokenStorage.saveAccountName(this.getAccountName().value);
      this.router.navigateByUrl("/home");
    } else {
      this.title = "Your account is not correct, please check your username or password"
    }
  }
}
