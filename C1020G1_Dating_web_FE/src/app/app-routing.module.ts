import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {ErrorPageComponent} from "./error/error-page/error-page.component";
import {LoginRoutingModule} from "./login/login-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./service/auth/auth-guard.service";
import {RecoverPasswordComponent} from "./login/recover-password/recover-password.component";
import {FriendRequestComponent} from "./wall/friend-request/friend-request.component";
import {TimelineComponent} from "./wall/timeline/timeline.component";

import {RegistrationComponent} from "./user-management/registration/registration.component";
import {InitialInformationComponent} from "./user-management/initial-information/initial-information.component";
import {RegisGuardService} from "./user-management/service/regis-guard";
import {RoomListComponent} from "./chat/room-list/room-list.component";
import {ChatRoomComponent} from "./chat/chat-room/chat-room.component";
import {F} from "@angular/cdk/keycodes";


const routes: Routes = [
  {path: 'c10tinder', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'recover', component: RecoverPasswordComponent},
  {path: 'home', component: RoomListComponent, canActivate: [AuthGuardService]},
  // {path: 'friend_request', component: FriendRequestComponent}
  // {path: 'registration', component: RegistrationComponent},
  // {path: 'initial-information', component: InitialInformationComponent, canActivate: [RegisGuardService]},
  // {path: 'chat', component:ChatRoomComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [
    LoginRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})

export class AppRoutingModule {
}
