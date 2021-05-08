import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
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
import {EditDetailComponent} from "./user-management/edit/edit-detail/edit-detail.component";
import {InformationComponent} from "./wall/information/information.component";
import {FriendsComponent} from "./wall/friends/friends.component";
import {ErrorPageComponent} from "./error/error-page/error-page.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: 'name-search', component: NameSearchComponent, canActivate:[AuthGuardService]},
  {path: 'advanced-search', component: AdvancedSearchComponent, canActivate:[AuthGuardService]},
  {
    path: 'wall/:id',
    children: [
      {path: 'friend_request/:id', component: FriendRequestComponent},
      {path: 'friends/:id', component: FriendsComponent},
      {path: 'info/:id', component: InformationComponent},
      {path: 'edit/:id', component: InformationComponent},
    ],
    component: TopwallComponent, canActivate: [AuthGuardService]
  },
  {path: 'newsfeed', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: '', pathMatch: 'full', redirectTo: 'newsfeed'},
  {path: 'login', component: LoginComponent},
  {path: 'recover', component: RecoverPasswordComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'initial-information', component: InitialInformationComponent, canActivate: [RegisGuardService]},
  {
    path: 'edit',
    children: [
      {path: 'update-avatar', component: UpdateAvatarComponent},
      {path: 'status', component: UpdateStatusComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      {path: 'detail', component: EditDetailComponent}
    ],
    component: EditComponent, canActivate: [AuthGuardService]
  },
  {path: '**', component: ErrorPageComponent},
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
