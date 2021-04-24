import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {UserManagementModule} from "./user-management/user-management.module";
import {RegistrationComponent} from "./user-management/registration/registration.component";
import {InitialInformationComponent} from "./user-management/initial-information/initial-information.component";


const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'initial-information', component: InitialInformationComponent}
];

@NgModule({
  imports: [HttpClientModule, UserManagementModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
