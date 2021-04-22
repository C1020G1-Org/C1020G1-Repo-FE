import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from "./header/header.module";
import {FriendModule} from "./friend/friend.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FriendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
