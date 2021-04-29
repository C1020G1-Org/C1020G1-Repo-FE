import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {InitialInformationComponent} from "./initial-information/initial-information.component";
import {RegistrationComponent} from "./registration/registration.component";
import {WebcamComponent} from "./webcam/webcam.component";
import {UpdateAvatarComponent} from "./update-avatar/update-avatar.component";
import {UpdateStatusComponent} from "./update-status/update-status.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {LoadingComponent} from "./loading/loading.component";
import {WebcamModule} from "ngx-webcam";
import {EditComponent} from "./edit/edit.component";
import {HeaderModule} from "../header/header.module";
import {EditDetailComponent} from './edit/edit-detail/edit-detail.component';
import {EditModule} from "./edit/edit.module";


@NgModule({
  declarations: [
    RegistrationComponent,
    InitialInformationComponent,
    WebcamComponent,
    UpdateAvatarComponent,
    UpdateStatusComponent,
    ChangePasswordComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    HeaderModule,
    EditModule
  ]
})
export class UserManagementModule {
}
