import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { EpoDatePickerModule } from '../../external/e-po-datepicker/e-po-datepicker.module';
import { CustomDateFilterComponent } from './custom-date-filter.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DropDownListModule,
        EpoDatePickerModule
    ],
    declarations: [
        CustomDateFilterComponent
    ],
    exports: [
        CustomDateFilterComponent
    ]
})

export class CustomDateFilterModule { }
