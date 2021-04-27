import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
// import {HeaderModule} from "./header/header.module";
import {FooterModule} from "./footer/footer.module";
import {SearchingModule} from "./searching/searching.module";
import {HeaderComponent} from "./header/header.component";
import {UserManagementModule} from "./user-management/user-management.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {HeaderModule} from "./header/header.module";
import {FooterComponent} from "./footer/footer.component";
import {AdvancedSearchComponent} from "./searching/advanced-search/advanced-search.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    FooterComponent,
    // HeaderComponent,
    AdvancedSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SocialLoginModule,
    // HeaderModule,
    FooterModule,
    SearchingModule,
    UserManagementModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HeaderModule,
    FormsModule
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
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
