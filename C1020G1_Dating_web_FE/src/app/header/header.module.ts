import { SearchingModule } from './../searching/searching.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { NameSearchComponent } from '../searching/name-search/name-search.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: 'name-search', component: NameSearchComponent },
];

@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent,
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchingModule
  ]
})
export class HeaderModule {
}
