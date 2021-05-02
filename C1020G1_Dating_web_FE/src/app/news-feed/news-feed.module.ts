import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsModule } from '../comments/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModule } from '../post/post.module';
import {NewsfeedComponent} from "./newsfeed.component";
import {RouterModule} from "@angular/router";

import {FriendSuggestComponent} from "../friend-suggest/friend-suggest.component";
import {ChatModule} from "../chat/chat.module";

@NgModule({
  declarations: [NewsfeedComponent,FriendSuggestComponent],
  imports: [
    CommentsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PostModule,
    RouterModule,
    ChatModule
  ],
  exports: [NewsfeedComponent,FriendSuggestComponent]
})
export class NewsFeedModule { }
