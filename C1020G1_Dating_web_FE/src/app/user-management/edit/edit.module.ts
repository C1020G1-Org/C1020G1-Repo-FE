import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from "./edit.component";
import {EditDetailComponent} from "./edit-detail/edit-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [EditComponent,EditDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class EditModule { }
