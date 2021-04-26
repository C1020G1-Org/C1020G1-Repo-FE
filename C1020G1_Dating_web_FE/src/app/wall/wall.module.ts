import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimelineComponent} from './timeline/timeline.component';
import {InformationComponent} from './information/information.component';
import {FriendRequestComponent} from './friend-request/friend-request.component';
import {RouterModule} from "@angular/router";
import {TooltipModule} from "ng2-tooltip-directive";


@NgModule({
  declarations: [TimelineComponent, InformationComponent, FriendRequestComponent],
  exports: [
    TimelineComponent,
    InformationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
  ]
})
export class WallModule {
}
