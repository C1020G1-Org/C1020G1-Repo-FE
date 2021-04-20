import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSideBarComponent } from './chat-side-bar/chat-side-bar.component';
import { MessegerComponent } from './messeger/messeger.component';



@NgModule({
    declarations: [ChatSideBarComponent, MessegerComponent],
    exports: [
        ChatSideBarComponent,
        MessegerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ChatModule { }
