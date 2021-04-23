import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupMemberComponent } from './group-member/group-member.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [GroupListComponent, GroupDetailComponent, GroupMemberComponent],
  exports: [
    GroupDetailComponent,
    GroupListComponent,
    GroupMemberComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class GroupModule { }
