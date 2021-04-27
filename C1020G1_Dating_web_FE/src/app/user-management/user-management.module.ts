import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes} from "@angular/router";


const routes: Routes = [
  {path: 'edit/:id', component: EditComponent}
];

@NgModule({
  declarations: [EditComponent],
  exports: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserManagementModule {
}
