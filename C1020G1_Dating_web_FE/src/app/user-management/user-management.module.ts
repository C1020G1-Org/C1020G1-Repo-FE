import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { InitialInformationComponent } from './initial-information/initial-information.component';



@NgModule({
  declarations: [RegistrationComponent, InitialInformationComponent],
  exports: [
    RegistrationComponent,
    InitialInformationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserManagementModule { }
