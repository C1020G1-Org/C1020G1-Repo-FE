import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FriendListComponent} from "./friend/friend-list/friend-list.component";
import { FooterComponent } from './footer/footer/footer.component';
import {FriendRequestComponent} from "./wall/friend-request/friend-request.component";


const routes: Routes = [
  {path: 'friend-list', component: FriendListComponent},
  {path: 'friend_request', component:FriendRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,FooterComponent],
  declarations: [FooterComponent]
})
export class AppRoutingModule { }
