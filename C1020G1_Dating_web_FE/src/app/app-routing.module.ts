import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {ErrorPageComponent} from "./error/error-page/error-page.component";
import {LoginRoutingModule} from "./login/login-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./login/auth/auth-guard.service";


const routes: Routes = [
  {path: 'c10tinder' , pathMatch: 'full', redirectTo: 'error-page'},
  {path: 'login' , component: LoginComponent},
  {path: '' , component: LoginComponent},
  {path: 'error-page', component: ErrorPageComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [
    HttpClientModule,
    LoginRoutingModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
