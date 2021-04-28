import { LoginModule } from './login/login.module';
import { AdminGroupModule } from './admin-group/admin-group.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {GroupModule} from "./group/group.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminGroupModule,
    NgbModule,
    HttpClientModule,
    LoginModule,
    GroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
