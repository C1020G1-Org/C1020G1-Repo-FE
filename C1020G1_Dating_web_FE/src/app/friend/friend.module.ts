import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendSuggestComponent } from './friend-suggest/friend-suggest.component';
import {TooltipModule} from "ng2-tooltip-directive";
import {FriendRequestComponent} from "../wall/friend-request/friend-request.component";




@NgModule({
    declarations: [FriendListComponent, FriendSuggestComponent, FriendRequestComponent],
  exports: [
    FriendListComponent,
    FriendSuggestComponent,
    FriendRequestComponent
  ],
  imports: [
    CommonModule,
    TooltipModule
  ]
})
export class FriendModule { }
