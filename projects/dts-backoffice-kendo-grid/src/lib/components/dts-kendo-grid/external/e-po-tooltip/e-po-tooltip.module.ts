import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EpoTooltipDirective } from './e-po-tooltip.directive';

/**
 * @description
 *
 * Módulo da diretiva Po-Tooltip.
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [EpoTooltipDirective],
    exports: [EpoTooltipDirective]
})

export class EpoTooltipModule { }
