import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdvancedSearchComponent} from "../searching/advanced-search/advanced-search.component";

const routes: Routes = [
  {path: 'advanced-search', component: AdvancedSearchComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ErrorModule { }
