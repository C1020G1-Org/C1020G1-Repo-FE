import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsfeedComponent } from './news-feed/newsfeed/newsfeed.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsFeedModule } from './news-feed/news-feed.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentsModule } from './comments/comment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {PostModule} from "./post/post.module";
import {WallModule} from "./wall/wall.module";

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent
  ],
    imports: [
        NewsFeedModule,
        CommentsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        LoginModule,
        ErrorModule,
        SocialLoginModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        PostModule,
        WallModule
        // ReactiveFormsModule,
        // FormsModule
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
  bootstrap: [AppComponent],
  entryComponents : [DeleteDialogComponent]
})
export class AppModule { }
