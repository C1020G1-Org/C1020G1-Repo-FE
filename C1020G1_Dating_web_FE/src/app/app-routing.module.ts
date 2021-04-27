import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {ErrorPageComponent} from "./error/error-page/error-page.component";
import {LoginRoutingModule} from "./login/login-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./service/auth/auth-guard.service";
import {RecoverPasswordComponent} from "./login/recover-password/recover-password.component";
import { NewsfeedComponent } from './news-feed/newsfeed/newsfeed.component';
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {BrowserModule} from "@angular/platform-browser";
import {EditPostComponent} from "./post/edit-post/edit-post.component";
import {TimelineComponent} from "./wall/timeline/timeline.component";
import {InformationComponent} from "./wall/information/information.component";
import {TopwallComponent} from "./wall/topwall/topwall.component";
import {CommentComponent} from "./wall/comment/comment.component";


const routes: Routes = [
  {path: 'c10tinder' , pathMatch: 'full', redirectTo: 'error-page'},
  {path: 'login' , component: LoginComponent},
  {path: '' , component: LoginComponent},
  {path: 'recover' , component: RecoverPasswordComponent},
  {path: 'error-page', component: ErrorPageComponent, canActivate:[AuthGuardService]},
  {path: 'newsfeed', component: NewsfeedComponent, canActivate:[AuthGuardService]},
  {path: '', component: CreatePostComponent},
  {path: 'post-edit/:postId', component: EditPostComponent},
  {path: 'timeline/:id' , component: TimelineComponent},
  {path: 'info/:id' , component: InformationComponent},
  {path: 'topwall/:id' , component: TopwallComponent},
  {path: 'comment/:id' , component: CommentComponent}
];

@NgModule({
  imports: [
    HttpClientModule,
    LoginRoutingModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
