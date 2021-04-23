import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';



@NgModule({
  declarations: [CreatePostComponent, EditPostComponent],
  exports: [
    CreatePostComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostModule { }
