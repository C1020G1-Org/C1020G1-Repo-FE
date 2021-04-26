import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupMemberComponent } from './group-member/group-member.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {GroupHeaderComponent} from "./group-header/group-header.component";



@NgModule({
    declarations: [GroupListComponent, GroupDetailComponent, GroupMemberComponent,GroupHeaderComponent],
  exports: [
    GroupDetailComponent,
    GroupListComponent,
    GroupMemberComponent,
    GroupHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
  ]
})
export class GroupModule { }
