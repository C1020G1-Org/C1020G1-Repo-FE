import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ChatModule} from './chat/chat.module';

import {LoginModule} from "./login/login.module";
import {ErrorPageComponent} from './error/error-page/error-page.component';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import {HeaderModule} from "./header/header.module";
import {FooterModule} from "./footer/footer.module";
import {SearchingModule} from "./searching/searching.module";
import {HeaderComponent} from "./header/header.component";
import {UserManagementModule} from "./user-management/user-management.module";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {CommonModule, DatePipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {WallModule} from "./wall/wall.module";

// import {TooltipModule} from "ng2-tooltip-directive";


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SocialLoginModule,
    HeaderModule,
    FooterModule,
    SearchingModule,
    UserManagementModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ChatModule,
    AngularFireModule,
    CommonModule,
  ],
  providers: [{
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
    } as SocialAuthServiceConfig
  },DatePipe],

  bootstrap: [AppComponent]
})
export class AppModule {

}
