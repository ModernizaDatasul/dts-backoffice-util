import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EpoDatepickerComponent } from './e-po-datepicker.component';
import { EpoCalendarModule } from '../e-po-calendar/e-po-calendar.module';

@NgModule({
    imports: [
        CommonModule,
        EpoCalendarModule
    ],
    declarations: [
        EpoDatepickerComponent
    ],
    exports: [
        EpoDatepickerComponent
    ]
})

export class EpoDatePickerModule { }
