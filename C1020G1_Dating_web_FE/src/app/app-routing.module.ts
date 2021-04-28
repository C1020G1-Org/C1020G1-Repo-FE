import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchingModule } from './searching/searching.module';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SearchingModule, FormsModule, CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
