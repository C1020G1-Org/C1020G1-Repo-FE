import {BrowserModule} from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderModule} from "./header/header.module";
import {HttpClientModule} from "@angular/common/http";
import {WallModule} from "./wall/wall.module";
import {TooltipModule} from "ng2-tooltip-directive";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {environment} from "../environments/environment";
import {FriendModule} from "./friend/friend.module";


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    WallModule,
    FriendModule,
    HttpClientModule,
    TooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
