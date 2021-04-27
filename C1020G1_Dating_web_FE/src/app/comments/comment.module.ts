import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { CommentService } from '../service/comment.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [CommentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  exports: [CommentComponent]
})
export class CommentsModule { }
