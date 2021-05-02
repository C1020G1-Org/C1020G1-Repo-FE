import {AuthenticationService} from "../../service/auth/authentication-service";
import {TokenStorageService} from "../../service/auth/token-storage";
import {Account} from "../../service/auth/account";
import {JwtResponse} from "../../service/auth/JwtResponse";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user-model";
import firebase from "firebase";


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
  user: User;
  ref = firebase.database().ref('users/');


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

    if (this.tokenStorage.isLogged()) {
      this.router.navigateByUrl("/newsfeed")
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      const tokenGoogle = new JwtResponse(this.socialUser.idToken)
      this.auth.google(tokenGoogle).subscribe(req => {
          if (req.token == "") {
            this.tokenStorage.saveUser(req.user);
            this.router.navigateByUrl("/registration");
          } else {
            this.tokenStorage.saveToken(req.token);
            req.user.account = null;
            this.tokenStorage.saveUser(req.user);
            this.tokenStorage.saveAccountName(req.accountName);
            window.location.reload();
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
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(data => {
        this.socialUser = data;
        const tokenFacebook = new JwtResponse(this.socialUser.authToken)
        this.auth.facebook(tokenFacebook).subscribe(req => {
            if (req.token == "") {
              this.tokenStorage.saveUser(req.user);
              this.router.navigateByUrl("/registration");
            } else {
              this.tokenStorage.saveToken(req.token);
              req.user.account = null;
              this.tokenStorage.saveUser(req.user);
              this.tokenStorage.saveAccountName(req.accountName);
              window.location.reload();
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
        window.location.reload();
      }
    );
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
        this.user = data.user
        this.user.account = null
        this.tokenStorage.saveUser(this.user);
        this.login(data)
      })
    } else {
      this.auth.sendLogin(accountReg).subscribe(data => {
        this.user = data.user
        this.user.account = null
        this.tokenStorage.saveUser(data.user);
        this.loginRemember(data);

      })
    }
  }

  login(data) {
    if (data.token != "INVALID_CREDENTIALS") {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveAccountName(this.getAccountName().value);

      // this.chatOfThinh()
      window.location.reload();
    } else {
      this.title = "Your account is not correct, please check your username or password";
      this.isError = true;
    }
  }

  loginRemember(data) {
    if (data.token != "INVALID_CREDENTIALS") {
      this.tokenStorage.saveTokenRemember(data.token);
      this.tokenStorage.saveAccountName(this.getAccountName().value);
      // this.chatOfThinh();
      window.location.reload();
    } else {
      this.title = "Your account is not correct, please check your username or password"
    }
  }

  // Thinh
  // chatOfThinh() {
  //   const createNewUser = firebase.database().ref('users/').push();
  //   createNewUser.set(this.user);
  //   const id = this.tokenStorage.getUser().userId;
  //   this.ref.orderByChild('id').equalTo(id).once('value', snapshot => {
  //     if (snapshot.exists()) {
  //       localStorage.setItem('nickname1', String(id));
  //       // firebase.database().ref('users/' + id + '/fullName'  ).update(this.tokenService.getUser());
  //     } else {
  //       const newUser = firebase.database().ref('users/').push();
  //       newUser.set(this.tokenStorage.getUser());
  //       localStorage.setItem('nickname1', String(id));
  //     }
  //   });
  // }
}
