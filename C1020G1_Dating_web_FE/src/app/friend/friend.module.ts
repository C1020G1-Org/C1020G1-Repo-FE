import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFriendRequestComponent } from './list-friend-request/list-friend-request.component';



@NgModule({
    declarations: [ListFriendRequestComponent],
    exports: [
        ListFriendRequestComponent
    ],
    imports: [
        CommonModule
    ]
})
export class FriendModule { }
