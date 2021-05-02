import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePostComponent} from './create-post/create-post.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeletePostComponent } from './delete-post/delete-post.component';
import {NgxLoadingModule} from "ngx-loading";

@NgModule({
  declarations: [CreatePostComponent, EditPostComponent, DeletePostComponent],
  exports: [
    CreatePostComponent,
    EditPostComponent,
    DeletePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class PostModule {
}

