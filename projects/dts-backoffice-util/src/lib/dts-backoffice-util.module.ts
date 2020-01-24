import { NgModule } from '@angular/core';
import { DtsBackofficeUtilsComponent } from './dts-backoffice-util.component';
import { UserLoginService } from './session-info.service';

@NgModule({
  declarations: [
      DtsBackofficeUtilsComponent,
  ],
  imports: [
  ],
  exports: [
    DtsBackofficeUtilsComponent,
  ],
  providers: [
    UserLoginService
  ]
})
export class DtsBackofficeUtilsModule { }
