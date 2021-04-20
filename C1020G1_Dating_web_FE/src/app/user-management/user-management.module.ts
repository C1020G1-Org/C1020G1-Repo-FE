import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [EditComponent],
  exports: [
    EditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserManagementModule { }
