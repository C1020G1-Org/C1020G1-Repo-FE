import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecoverPasswordComponent} from "./recover-password/recover-password.component";



const routes: Routes = [
  {path: 'recover' , component: RecoverPasswordComponent},
  {path: 'login' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
