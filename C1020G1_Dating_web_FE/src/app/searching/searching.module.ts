import { NameSearchComponent } from './name-search/name-search.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AdvancedSearchComponent} from "./advanced-search/advanced-search.component";

const routes: Routes = [
  {path: 'searching/advanced-search', component: AdvancedSearchComponent},
];

@NgModule({
  declarations: [AdvancedSearchComponent,NameSearchComponent],
  exports: [
    RouterModule,
    NameSearchComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ]
})
export class SearchingModule { }
