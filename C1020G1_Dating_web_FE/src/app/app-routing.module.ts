import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer/footer.component';
import { SearchingModule } from './searching/searching.module';
import { AdvancedSearchComponent } from './searching/advanced-search/advanced-search.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


const routes: Routes = [
];

@NgModule({
    imports: [RouterModule.forRoot(routes), SearchingModule, FormsModule, CommonModule],
  exports: [RouterModule, FooterComponent],
  declarations: [FooterComponent, AdvancedSearchComponent]
})
export class AppRoutingModule { }
