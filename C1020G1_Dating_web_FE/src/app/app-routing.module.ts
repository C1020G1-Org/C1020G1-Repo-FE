import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimelineComponent} from "./wall/timeline/timeline.component";
import {InformationComponent} from "./wall/information/information.component";


const routes: Routes = [
  {path: 'timeline' , component: TimelineComponent},
  {path: 'info' , component: InformationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
