import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { DtsKendoGridComponent } from './components/dts-kendo-grid/dts-kendo-grid.component';
import { FormsModule } from '@angular/forms';
import { PoTooltipModule } from './components/dts-kendo-grid/directives/po-tooltip/po-tooltip.module';

@NgModule({
  declarations: [
    DtsKendoGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PoTooltipModule,
    GridModule,
    ExcelModule,
    PDFModule
  ],
  exports: [
    DtsKendoGridComponent
  ],
  providers: [
  ]
})

export class DtsBackofficeKendoGridModule { }
