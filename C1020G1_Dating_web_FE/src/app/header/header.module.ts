import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {Routes, RouterModule} from '@angular/router';
import { NameSearchComponent } from '../searching/name-search/name-search.component'
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'name-search/:keySearch', component: NameSearchComponent},
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
    FormsModule
  ]
})
export class HeaderModule {
}
