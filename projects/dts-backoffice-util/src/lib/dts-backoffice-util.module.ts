import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  TotvsScheduleExecutionComponent
} from './components/totvs-schedule-execution/totvs-schedule-execution.component';
import { FormsModule } from '@angular/forms';
import { PoModule, PoI18nService } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
import { TotvsScheduleExecutionService } from './components/totvs-schedule-execution/totvs-schedule-execution.service';
import { CommonModule } from '@angular/common';
import { DtsDateFormatPipe } from './pipes/dts-date-format.pipe';

@NgModule({
  declarations: [
    TotvsScheduleExecutionComponent,
    DtsDateFormatPipe
  ],
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    TotvsScheduleExecutionComponent,
    DtsDateFormatPipe
  ],
  providers: [
    TotvsScheduleExecutionService
  ]
})

export class DtsBackofficeUtilsModule {
  static forRoot(): ModuleWithProviders<DtsBackofficeUtilsModule> {
    return {
      ngModule: DtsBackofficeUtilsModule,
      providers: [TotvsScheduleExecutionService]
    };
  }
}
