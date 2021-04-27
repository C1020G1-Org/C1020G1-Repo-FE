import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FriendModule} from "./friend/friend.module";
import {FriendService} from "./friend/friend.service";
import {HttpClientModule} from "@angular/common/http";
import {WallModule} from "./wall/wall.module";



@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FriendModule,
        HttpClientModule,
        WallModule
],
  providers: [FriendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
