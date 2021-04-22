import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupListRequestComponent} from "./list/group-list-request/group-list-request.component";
import {GroupMemberListComponent} from "./list/group-member-list/group-member-list.component";
import {GroupMemberWarningComponent} from "./list/group-member-warning/group-member-warning.component";
import {GroupMemberComponent} from "./view/group-member/group-member.component";
import {GroupRequestComponent} from "./view/group-request/group-request.component";
import {RemoveMemberModalComponent} from "./modal/remove-member-modal/remove-member-modal.component";
import {InviteModalComponent} from "./modal/invite-modal/invite-modal.component";
import {CancelRequestModalComponent} from "./modal/cancel-request-modal/cancel-request-modal.component";
import {AcceptModalComponent} from "./modal/accept-modal/accept-modal.component";
import {WarningMemberModalComponent} from "./modal/warning-member-modal/warning-member-modal.component";

const routes: Routes = [
  {path: 'group/request/list', component: GroupListRequestComponent},
  {path: 'group/member/list', component: GroupMemberListComponent},
  {path: 'group/warning/:id', component: GroupMemberWarningComponent},
  {path: 'group/request/:id', component: GroupListRequestComponent}
];

@NgModule({
  declarations: [
    GroupListRequestComponent, GroupMemberWarningComponent, GroupMemberComponent, GroupRequestComponent, GroupMemberListComponent,
    AcceptModalComponent, CancelRequestModalComponent, InviteModalComponent, RemoveMemberModalComponent, WarningMemberModalComponent
  ],
  exports: [
    GroupMemberComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ]
})
export class GroupModule {
}
