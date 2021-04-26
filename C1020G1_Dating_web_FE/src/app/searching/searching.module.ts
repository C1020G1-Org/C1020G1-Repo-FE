import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AdvancedSearchComponent} from "./advanced-search/advanced-search.component";

const routes: Routes = [
  {path: 'searching/advanced-search', component: AdvancedSearchComponent},
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class SearchingModule { }
