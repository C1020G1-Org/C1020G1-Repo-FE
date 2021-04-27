import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {TooltipModule} from "ng2-tooltip-directive";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule
  ]
})
export class HeaderModule { }
