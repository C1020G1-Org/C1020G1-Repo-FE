import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoadingComponent } from './loading/loading.component';
import { WebcamComponent } from './webcam/webcam.component';



@NgModule({
    declarations: [UpdateAvatarComponent, UpdateStatusComponent, ChangePasswordComponent, LoadingComponent, WebcamComponent],
    exports: [
        ChangePasswordComponent
    ],
    imports: [
        CommonModule
    ]
})
export class UserManagementModule { }
