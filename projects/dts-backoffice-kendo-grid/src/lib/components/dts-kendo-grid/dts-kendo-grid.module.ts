import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';

import { EpoTooltipModule } from './external/e-po-tooltip/e-po-tooltip.module';
import { CustomDateFilterModule } from './custom/custom-date-filter/custom-date-filter.module';
import { EpoDatePickerModule } from '../../components/dts-kendo-grid/external/e-po-datepicker/e-po-datepicker.module';
import { EpoCalendarModule } from '../../components/dts-kendo-grid/external/e-po-calendar/e-po-calendar.module';

/**
 * @description
 *
 * Módulo do componente dts-kendo-grid.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    DropDownListModule,
    ExcelModule,
    EpoTooltipModule,
    PDFModule,
    CustomDateFilterModule,
    EpoDatePickerModule,
    EpoCalendarModule
  ],
  declarations: [
  ],
  exports: [],
  providers: [],
  schemas: []
})
export class DtsKendoGridModule { }
