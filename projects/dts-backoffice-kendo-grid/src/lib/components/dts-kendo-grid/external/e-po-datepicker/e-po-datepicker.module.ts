import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EpoDatepickerComponent } from './e-po-datepicker.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EpoDatepickerComponent
    ],
    exports: [
        EpoDatepickerComponent
    ]
})

export class EpoDatepickerModule { }
