import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import { ErrorPageComponent } from './error/error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LoginModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
