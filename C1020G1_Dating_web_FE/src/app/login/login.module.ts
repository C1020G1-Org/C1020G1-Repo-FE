import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { LoginRoutingModule } from './login-routing.module';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';



@NgModule({
  declarations: [LoginComponent, RecoverPasswordComponent],
  exports: [
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    LoginRoutingModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '995950085039-m1rgd3afdhashcnebmg6q5g0112httdv.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1763676513806884')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class LoginModule { }
