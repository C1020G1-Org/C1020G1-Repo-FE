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
import {FooterModule} from "./footer/footer.module";
import {SearchingModule} from "./searching/searching.module";
import {HeaderComponent} from "./header/header.component";
import {UserManagementModule} from "./user-management/user-management.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LoadingComponent} from "./user-management/loading/loading.component";
import {ChangePasswordComponent} from "./user-management/change-password/change-password.component";
import {UpdateStatusComponent} from "./user-management/update-status/update-status.component";
import {UpdateAvatarComponent} from "./user-management/update-avatar/update-avatar.component";
import {WebcamComponent} from "./user-management/webcam/webcam.component";
import {WebcamModule} from "ngx-webcam";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderModule} from "./header/header.module";
import {FooterComponent} from "./footer/footer.component";
import {AdvancedSearchComponent} from "./searching/advanced-search/advanced-search.component";
import {TooltipModule} from "ng2-tooltip-directive";
import {WallModule} from "./wall/wall.module";
import {TopwallComponent} from "./wall/topwall/topwall.component";


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    FooterComponent,
    AdvancedSearchComponent,
    TopwallComponent
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbModule,
    WebcamModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule,
    WallModule,
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
