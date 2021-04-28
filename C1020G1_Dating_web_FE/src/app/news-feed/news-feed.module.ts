import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { CommentsModule } from '../comments/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModule } from '../post/post.module';

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
