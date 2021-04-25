import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {InitialInformationComponent} from "./initial-information/initial-information.component";
import {RegistrationComponent} from "./registration/registration.component";



@NgModule({
  declarations: [
    RegistrationComponent,
    InitialInformationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserManagementModule { }
