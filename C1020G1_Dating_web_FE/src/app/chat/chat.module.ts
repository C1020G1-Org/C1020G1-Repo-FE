import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatRoomComponent} from "./chat-room/chat-room.component";
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [ ChatRoomComponent, AddRoomComponent, RoomListComponent],
    exports: [
      ChatRoomComponent
    ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class ChatModule { }
