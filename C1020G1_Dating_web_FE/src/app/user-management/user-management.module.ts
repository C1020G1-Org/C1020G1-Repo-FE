import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
    declarations: [UpdateAvatarComponent, UpdateStatusComponent, ChangePasswordComponent],
    exports: [
        ChangePasswordComponent
    ],
    imports: [
        CommonModule
    ]
})
export class UserManagementModule { }
