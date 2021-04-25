import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimelineComponent} from "./wall/timeline/timeline.component";
import {InformationComponent} from "./wall/information/information.component";
import {ImageComponent} from "./wall/image/image.component";


const routes: Routes = [
  {path: 'timeline/:id' , component: TimelineComponent},
  {path: 'info/:id' , component: InformationComponent},
  {path: 'image' , component: ImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
