import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';

import { DtsKendoGridComponent } from './dts-kendo-grid.component';
import { FormsModule } from '@angular/forms';
import { PoTooltipModule } from './directives/po-tooltip/po-tooltip.module';
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
    ExcelModule,
    PoTooltipModule,
    PDFModule
  ],
  declarations: [
  ],
  exports: [],
  providers: [],
  schemas: []
})
export class DtsKendoGridModule { }
