import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EpoCalendarLangService } from './e-po-calendar.lang.service';
import { EpoCalendarService } from './e-po-calendar.service';
import { EpoCalendarComponent } from './e-po-calendar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        EpoCalendarLangService,
        EpoCalendarService
    ],
    declarations: [
        EpoCalendarComponent
    ],
    exports: [
        EpoCalendarComponent
    ]
})

export class EpoCalendarModule { }
