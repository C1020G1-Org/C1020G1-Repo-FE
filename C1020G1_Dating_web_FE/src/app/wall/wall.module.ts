import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { InformationComponent } from './information/information.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [TimelineComponent, InformationComponent],
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
