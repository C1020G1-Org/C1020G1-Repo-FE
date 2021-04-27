import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimelineComponent} from "./wall/timeline/timeline.component";
import {InformationComponent} from "./wall/information/information.component";
import {TopwallComponent} from "./wall/topwall/topwall.component";
import {CommentComponent} from "./wall/comment/comment.component";


const routes: Routes = [
  {path: 'timeline/:id' , component: TimelineComponent},
  {path: 'info/:id' , component: InformationComponent},
  {path: 'topwall/:id' , component: TopwallComponent},
  {path: 'comment/:id' , component: CommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
