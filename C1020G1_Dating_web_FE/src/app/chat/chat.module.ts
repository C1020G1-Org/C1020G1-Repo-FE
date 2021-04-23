import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { ListRoomComponent } from './list-room/list-room.component';



@NgModule({
    declarations: [ ChatRoomComponent, AddRoomComponent, ListRoomComponent],
    exports: [
        ChatRoomComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ChatModule { }
