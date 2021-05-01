import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';

import {TooltipModule} from "ng2-tooltip-directive";
import { InformationComponent } from './information/information.component';
import {RouterModule} from "@angular/router";
import {FriendRequestComponent} from "./friend-request/friend-request.component";
import {FriendsComponent} from "./friends/friends.component";
import {NewsFeedModule} from "../news-feed/news-feed.module";
@NgModule({
  declarations: [TimelineComponent, InformationComponent, FriendRequestComponent , FriendsComponent],
  exports: [
    TimelineComponent,
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
