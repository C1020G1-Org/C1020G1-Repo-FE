import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer/footer.component';
import {FriendRequestComponent} from "./wall/friend-request/friend-request.component";
import {TimelineComponent} from "./wall/timeline/timeline.component";


const routes: Routes = [
  {path: '',component:TimelineComponent},
  {path: 'friend_request', component:FriendRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FooterComponent],
  declarations: [FooterComponent]
})
export class AppRoutingModule { }
