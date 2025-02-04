import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

import { EpoControlPositionService } from '../e-po-control-position/e-po-control-position.service';
import { EpoTooltipBaseDirective } from './e-po-tooltip-base.directive';

/**
 * @docsExtends ePoTooltipBaseDirective
 *
 * @example
 *
 * <example name="po-tooltip-basic" title="PO-UI Tooltip Basic" >
 *  <file name="sample-po-tooltip-basic/sample-po-tooltip-basic.component.html"> </file>
 *  <file name="sample-po-tooltip-basic/sample-po-tooltip-basic.component.ts"> </file>
 * </example>
 *
 * <example name="po-tooltip-labs" title="PO-UI Tooltip Labs" >
 *  <file name="sample-po-tooltip-labs/sample-po-tooltip-labs.component.html"> </file>
 *  <file name="sample-po-tooltip-labs/sample-po-tooltip-labs.component.ts"> </file>
 * </example>
 *
 * <example name="po-tooltip-new-user" title="PO-UI Tooltip - New User" >
 *  <file name="sample-po-tooltip-new-user/sample-po-tooltip-new-user.component.html"> </file>
 *  <file name="sample-po-tooltip-new-user/sample-po-tooltip-new-user.component.ts"> </file>
 * </example>
 *
 */
@Directive({
    selector: '[p-tooltip]',
    providers: [EpoControlPositionService],
    standalone: false
})
export class EpoTooltipDirective extends EpoTooltipBaseDirective implements OnInit {

    private arrowDirection: string;
    private divArrow;
    private divContent;
    private isHidden: boolean;
    private lastTooltipText: string;
    private textContent;
    private tooltipContent;
    private tooltipOffset: number = 8;

    private isShow = true;

    private eventListenerFunction: () => void;

    constructor(private elementRef: ElementRef,
        private renderer: Renderer2,
        private ePoControlPosition: EpoControlPositionService) {

        super();
    }

    ngOnInit() {
        this.initScrollEventListenerFunction();
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.isShow = true;

        setTimeout(() => {
            if (this.tooltip && this.isShow) {
                this.tooltipContent ? this.showTooltip() : this.createTooltip();

                this.removeArrow(this.arrowDirection);

                this.ePoControlPosition.adjustPosition(this.tooltipPosition);
                this.arrowDirection = this.ePoControlPosition.getArrowDirection();

                this.addArrow(this.arrowDirection);

                this.lastTooltipText = this.tooltip;
            }
        }, 500);

    }

    @HostListener('mouseleave') onMouseLeave() {
        this.hideTooltip();
        this.isShow = false;
    }

    private addArrow(arrowDirection) {
        this.renderer.addClass(this.divArrow, `po-arrow-${arrowDirection}`);
    }

    private addScrollEventListener() {
        window.addEventListener('scroll', this.eventListenerFunction, true);
    }

    // Monta a estrutura do tooltip
    private createTooltip() {
        this.tooltipContent = this.renderer.createElement('div');
        this.renderer.addClass(this.tooltipContent, 'po-tooltip');

        this.divArrow = this.renderer.createElement('div');
        this.renderer.addClass(this.divArrow, 'po-tooltip-arrow');

        this.divContent = this.renderer.createElement('div');
        this.renderer.addClass(this.divContent, 'po-tooltip-content');

        this.textContent = this.renderer.createText(this.tooltip);

        this.renderer.appendChild(this.divContent, this.textContent);
        this.renderer.appendChild(this.tooltipContent, this.divArrow);
        this.renderer.appendChild(this.tooltipContent, this.divContent);
        this.renderer.appendChild(this.elementRef.nativeElement, this.tooltipContent);

        this.ePoControlPosition.setElements(this.tooltipContent, this.tooltipOffset, this.elementRef);

        this.addScrollEventListener();
    }

    private initScrollEventListenerFunction() {
        this.eventListenerFunction = () => {
            if (!this.isHidden) {
                setTimeout(() => {
                    this.ePoControlPosition.adjustPosition(this.tooltipPosition);
                });
            }
        };
    }

    private hideTooltip() {
        if (this.tooltipContent) {
            this.renderer.addClass(this.tooltipContent, 'po-invisible');
            this.isHidden = true;

            this.removeScrollEventListener();
        }
    }

    private removeArrow(arrowDirection) {
        if (this.elementRef.nativeElement.querySelector(`.po-arrow-${arrowDirection}`)) {
            this.renderer.removeClass(this.divArrow, `po-arrow-${arrowDirection}`);
        }
    }

    private removeScrollEventListener() {
        window.removeEventListener('scroll', this.eventListenerFunction, true);
    }

    private showTooltip() {
        this.renderer.removeClass(this.tooltipContent, 'po-invisible');
        this.updateTextContent();
        this.isHidden = false;

        this.addScrollEventListener();
    }

    private updateTextContent() {
        if (this.lastTooltipText !== this.tooltip) {
            this.renderer.removeChild(this.divContent, this.textContent);
            this.textContent = this.renderer.createText(this.tooltip);
            this.renderer.appendChild(this.divContent, this.textContent);
        }
    }

}
