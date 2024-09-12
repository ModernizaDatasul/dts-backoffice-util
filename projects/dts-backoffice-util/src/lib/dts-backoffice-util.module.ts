import { NgModule, ModuleWithProviders } from '@angular/core';
import { TotvsScheduleExecutionComponent } from './components/totvs-schedule-execution/totvs-schedule-execution.component';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TotvsScheduleExecutionService } from './components/totvs-schedule-execution/totvs-schedule-execution.service';
import { TotvsMapComponent } from './components/totvs-map/totvs-map.component';
import { DtsDateFormatPipe } from './pipes/dts-date-format.pipe';

@NgModule({
  declarations: [
    TotvsScheduleExecutionComponent,
    TotvsMapComponent,
    DtsDateFormatPipe
  ],
  exports: [
    TotvsScheduleExecutionComponent,
    TotvsMapComponent,
    DtsDateFormatPipe
  ],
  imports: [
    CommonModule,
    PoModule,
    FormsModule
  ],
  providers: [
    TotvsScheduleExecutionService,
    provideHttpClient(withInterceptorsFromDi())
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
