import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendSuggestComponent } from './friend-suggest/friend-suggest.component';



@NgModule({
    declarations: [FriendListComponent, FriendSuggestComponent],
  exports: [
    FriendListComponent,
    FriendSuggestComponent
  ],
    imports: [
        CommonModule
    ]
})
export class FriendModule { }
