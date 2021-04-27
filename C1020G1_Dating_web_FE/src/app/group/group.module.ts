import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GroupDetailComponent } from "./group-detail/group-detail.component";
import { GroupHeaderComponent } from "./group-header/group-header.component";
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupMemberComponent } from "./group-member/group-member.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [GroupListComponent, GroupDetailComponent, GroupMemberComponent, GroupHeaderComponent],
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
export class GroupModule {}
