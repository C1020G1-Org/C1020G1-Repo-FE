import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { CommentsModule } from '../comments/comment.module';
import { CommentComponent } from '../comments/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [NewsfeedComponent],
  imports: [
    CommentsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [NewsfeedComponent]
})
export class NewsFeedModule { }
