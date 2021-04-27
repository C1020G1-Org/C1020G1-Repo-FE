import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendSuggestComponent } from './friend-suggest/friend-suggest.component';
import {TooltipModule} from "ng2-tooltip-directive";



@NgModule({
    declarations: [FriendListComponent, FriendSuggestComponent],
  exports: [
    FriendListComponent,
    FriendSuggestComponent
  ],
  imports: [
    CommonModule,
    TooltipModule
  ]
})
export class FriendModule { }
