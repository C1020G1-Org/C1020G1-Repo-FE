import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GroupModule} from "./group/group.module";
import {HeaderComponent} from "./header/header.component";
import { GroupHeaderComponent } from './group/group-header/group-header.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        GroupHeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GroupModule,
        HttpClientModule
    ],
    providers: [],
    exports: [
        GroupHeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
