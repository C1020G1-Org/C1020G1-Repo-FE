import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { InformationComponent } from './information/information.component';
import {RouterModule} from "@angular/router";
import { TopwallComponent } from './topwall/topwall.component';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [TimelineComponent, InformationComponent, TopwallComponent, CommentComponent],
  exports: [
    TimelineComponent,
    InformationComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class WallModule { }
