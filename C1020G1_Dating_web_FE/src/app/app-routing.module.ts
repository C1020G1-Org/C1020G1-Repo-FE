import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {ErrorPageComponent} from "./error/error-page/error-page.component";
import {LoginRoutingModule} from "./login/login-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./service/auth/auth-guard.service";
import {RecoverPasswordComponent} from "./login/recover-password/recover-password.component";
import { NewsfeedComponent } from './news-feed/newsfeed/newsfeed.component';


const routes: Routes = [
  {path: 'c10tinder' , pathMatch: 'full', redirectTo: 'error-page'},
  {path: 'login' , component: LoginComponent},
  {path: '' , component: LoginComponent},
  {path: 'recover' , component: RecoverPasswordComponent},
  {path: 'error-page', component: ErrorPageComponent, canActivate:[AuthGuardService]},
  {path: 'newsfeed', component: NewsfeedComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [
    HttpClientModule,
    LoginRoutingModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
