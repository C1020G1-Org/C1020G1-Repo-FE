import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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



@NgModule({
  declarations: [
    RegistrationComponent,
    InitialInformationComponent,
    WebcamComponent,
    UpdateAvatarComponent,
    UpdateStatusComponent,
    ChangePasswordComponent,
    LoadingComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    WebcamModule
  ]
})
export class UserManagementModule { }
