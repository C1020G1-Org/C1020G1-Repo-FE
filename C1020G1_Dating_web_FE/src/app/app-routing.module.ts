import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {ErrorPageComponent} from "./error/error-page/error-page.component";
import {NameSearchComponent} from "./searching/name-search/name-search.component";
import {AdvancedSearchComponent} from "./searching/advanced-search/advanced-search.component";
import {LoginRoutingModule} from "./login/login-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./service/auth/auth-guard.service";
import {RecoverPasswordComponent} from "./login/recover-password/recover-password.component";
import {RegistrationComponent} from "./user-management/registration/registration.component";
import {InitialInformationComponent} from "./user-management/initial-information/initial-information.component";
import {RegisGuardService} from "./user-management/service/regis-guard";
import {UpdateAvatarComponent} from "./user-management/update-avatar/update-avatar.component";
import {UpdateStatusComponent} from "./user-management/update-status/update-status.component";
import {ChangePasswordComponent} from "./user-management/change-password/change-password.component";
import {EditComponent} from "./user-management/edit/edit.component";
import {FriendRequestComponent} from "./wall/friend-request/friend-request.component";
import {TopwallComponent} from "./wall/topwall/topwall.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'name-search', component: NameSearchComponent},
      {path: 'advanced-search', component: AdvancedSearchComponent},
      {path: 'friend-request/:id', component: TopwallComponent},
    ],
    component: ErrorPageComponent, canActivate: [AuthGuardService]
  },
  {path: 'c10tinder', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'recover', component: RecoverPasswordComponent},
  {path: 'home', component: ErrorPageComponent, canActivate: [AuthGuardService]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'initial-information', component: InitialInformationComponent, canActivate: [RegisGuardService]},
  {path: 'update-avatar', component: UpdateAvatarComponent, canActivate: [AuthGuardService]},
  {path: 'status', component: UpdateStatusComponent, canActivate: [AuthGuardService]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuardService]},
  {path: 'edit', component: EditComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    HttpClientModule,
    LoginRoutingModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
