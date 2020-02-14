import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';

import { DtsKendoGridComponent } from './dts-kendo-grid.component';

/**
 * @description
 *
 * Módulo do componente dts-kendo-grid.
 */
@NgModule({
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule
  ],
  declarations: [
    DtsKendoGridComponent
  ],
  exports: [DtsKendoGridComponent],
  providers: [],
  schemas: []
})
export class DtsKendoGridModule { }
