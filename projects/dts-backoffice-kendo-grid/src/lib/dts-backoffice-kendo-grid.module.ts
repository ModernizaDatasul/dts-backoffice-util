import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';

import { DtsKendoGridComponent } from './components/dts-kendo-grid/dts-kendo-grid.component';
import { EpoTooltipModule } from './components/dts-kendo-grid/external/e-po-tooltip/e-po-tooltip.module';
import { CustomDateFilterModule } from './components/dts-kendo-grid/custom/custom-date-filter/custom-date-filter.module';
import { EpoDatePickerModule } from './components/dts-kendo-grid/external/e-po-datepicker/e-po-datepicker.module';
import { EpoCalendarModule } from './components/dts-kendo-grid/external/e-po-calendar/e-po-calendar.module';

@NgModule({
  declarations: [
    DtsKendoGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EpoTooltipModule,
    GridModule,
    DropDownListModule,
    ExcelModule,
    PDFModule,
    CustomDateFilterModule,
    EpoDatePickerModule,
    EpoCalendarModule
  ],
  exports: [
    DtsKendoGridComponent
  ],
  providers: [
  ]
})

export class DtsBackofficeKendoGridModule { }
