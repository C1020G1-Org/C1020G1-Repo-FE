import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TooltipModule} from "ng2-tooltip-directive";
import { InformationComponent } from './information/information.component';
import {RouterModule} from "@angular/router";
import {FriendRequestComponent} from "./friend-request/friend-request.component";
import {FriendsComponent} from "./friends/friends.component";
import {NewsFeedModule} from "../news-feed/news-feed.module";
@NgModule({
  declarations: [InformationComponent, FriendRequestComponent , FriendsComponent],
  exports: [
    FriendRequestComponent,
    InformationComponent,
    FriendsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    NewsFeedModule
  ]
})
export class WallModule {
}
