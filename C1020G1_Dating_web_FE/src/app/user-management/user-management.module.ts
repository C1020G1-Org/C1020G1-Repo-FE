import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {InitialInformationComponent} from './initial-information/initial-information.component';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [RegistrationComponent, InitialInformationComponent],
  exports: [
    RegistrationComponent,
    InitialInformationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserManagementModule {
}
