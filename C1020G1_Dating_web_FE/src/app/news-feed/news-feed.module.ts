import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsModule } from '../comments/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModule } from '../post/post.module';
import {NewsfeedComponent} from "./newsfeed.component";

@NgModule({
  declarations: [NewsfeedComponent],
  imports: [
    CommentsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PostModule
  ],
  exports: [NewsfeedComponent]
})
export class NewsFeedModule { }
