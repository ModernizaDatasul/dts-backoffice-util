import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { DtsKendoGridComponent } from './components/dts-kendo-grid/dts-kendo-grid.component';

@NgModule({
  declarations: [
    DtsKendoGridComponent
  ],
  imports: [
    CommonModule,
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
