import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {Routes, RouterModule} from '@angular/router';
import { NameSearchComponent } from '../searching/name-search/name-search.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'name-search', component: NameSearchComponent},
];

@NgModule({
  declarations: [HeaderComponent,
    NameSearchComponent],
  exports: [
    HeaderComponent,
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HeaderModule {
}
