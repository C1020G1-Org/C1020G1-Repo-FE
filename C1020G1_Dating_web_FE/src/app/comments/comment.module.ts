import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommentComponent} from "./comment.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [CommentComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
    ],
  exports: [CommentComponent]
})
export class CommentsModule { }
