
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupListRequestComponent } from './list/group-list-request/group-list-request.component';
import { GroupMemberListComponent } from './list/group-member-list/group-member-list.component';
import { GroupMemberWarningComponent } from './list/group-member-warning/group-member-warning.component';
import { AcceptModalComponent } from './modal/accept-modal/accept-modal.component';
import { CancelRequestModalComponent } from './modal/cancel-request-modal/cancel-request-modal.component';
import { InviteModalComponent } from './modal/invite-modal/invite-modal.component';
import { RemoveMemberModalComponent } from './modal/remove-member-modal/remove-member-modal.component';
import { WarningMemberModalComponent } from './modal/warning-member-modal/warning-member-modal.component';
import { GroupRequestComponent } from './view/group-request/group-request.component';
import { AsideComponent } from './aside/aside.component';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import {GroupMemberComponent} from "./view/group-member/group-member.component";
import {GroupModule} from "../group/group.module";
import {AuthGuardService} from "../service/auth/auth-guard.service";


const routes: Routes = [
  { path: 'group/member/list/:id', component: GroupMemberListComponent, canActivate:[AuthGuardService]} ,
  { path: 'group/warning/:id/:guid', component: GroupMemberWarningComponent, canActivate:[AuthGuardService]} ,
  { path: 'group/request/list/:id', component: GroupListRequestComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  declarations: [GroupListRequestComponent, GroupMemberWarningComponent, GroupMemberComponent, GroupRequestComponent, GroupMemberListComponent,
    AcceptModalComponent, CancelRequestModalComponent, InviteModalComponent, RemoveMemberModalComponent, WarningMemberModalComponent, AsideComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HeaderModule,
    RouterModule.forChild(routes),
    FooterModule,
    GroupModule
  ],
  exports: [
  ]
})
export class AdminGroupModule { }
