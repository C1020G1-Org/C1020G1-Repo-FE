import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {BrowserModule} from "@angular/platform-browser";
import {EditPostComponent} from "./post/edit-post/edit-post.component";


const routes: Routes = [
  {path: '', component: CreatePostComponent},
  {path: 'post-edit/:postId', component: EditPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
