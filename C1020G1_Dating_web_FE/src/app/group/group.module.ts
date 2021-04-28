import { FooterModule } from './../footer/footer.module';
import { HeaderModule } from './../header/header.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { GroupDetailComponent } from "./group-detail/group-detail.component";
import { GroupHeaderComponent } from "./group-header/group-header.component";
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupMemberComponent } from "./group-member/group-member.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'group/details/:id', component: GroupDetailComponent },
  { path: 'group/list', component: GroupListComponent },
  { path: 'group/member/:id', component: GroupMemberComponent }
]

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
    RouterModule.forChild(routes),
    HeaderModule,
    FooterModule
  ]
})
export class GroupModule { }
