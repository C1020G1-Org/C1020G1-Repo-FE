import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupListComponent} from "./group/group-list/group-list.component";
import {GroupDetailComponent} from "./group/group-detail/group-detail.component";
import {GroupMemberComponent} from "./group/group-member/group-member.component";
import {FormsModule} from "@angular/forms";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path: '',component: GroupListComponent},
  {path: 'group-detail/:id',component: GroupDetailComponent},
  {path: 'group-member/:id',component: GroupMemberComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,Ng2SearchPipeModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
