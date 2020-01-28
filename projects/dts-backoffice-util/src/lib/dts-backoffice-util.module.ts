import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  TotvsScheduleExecutionComponent
} from './components/totvs-schedule-execution/totvs-schedule-execution.component';
import { FormsModule } from '@angular/forms';
import { PoModule, PoI18nService } from '@portinari/portinari-ui';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
import { RpwService } from './components/totvs-schedule-execution/totvs-schedule-execution.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TotvsScheduleExecutionComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    TotvsScheduleExecutionComponent
  ],
  providers: [
    RpwService
  ]
})

export class DtsBackofficeUtilsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DtsBackofficeUtilsModule,
      providers: [RpwService]
    };
  }
}
