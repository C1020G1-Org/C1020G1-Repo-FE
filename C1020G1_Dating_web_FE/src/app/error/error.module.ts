import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderModule } from './../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    HeaderModule
  ]
})
export class ErrorModule { }
