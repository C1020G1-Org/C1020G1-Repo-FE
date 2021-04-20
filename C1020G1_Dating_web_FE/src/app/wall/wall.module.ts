import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { InformationComponent } from './information/information.component';



@NgModule({
  declarations: [TimelineComponent, InformationComponent],
  exports: [
    TimelineComponent,
    InformationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WallModule { }
