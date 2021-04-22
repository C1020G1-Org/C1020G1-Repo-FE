import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponentComponent } from './header-component/header-component.component';



@NgModule({
    declarations: [HeaderComponentComponent],
    exports: [
        HeaderComponentComponent
    ],
    imports: [
        CommonModule
    ]
})
export class HeaderModule { }
