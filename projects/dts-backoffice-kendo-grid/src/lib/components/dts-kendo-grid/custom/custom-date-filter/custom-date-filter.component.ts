import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DateFilterMenuComponent, FilterService } from '@progress/kendo-angular-grid';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';

import { ElementRef } from '@angular/core';
import { SinglePopupService, PopupCloseEvent } from '@progress/kendo-angular-grid';

const closest = (node: any, predicate: any): any => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};

@Component({
    selector: 'custom-date-filter',
    templateUrl: './custom-date-filter.component.html',
    styleUrls: ['./custom-date-filter.component.css']
})
export class CustomDateFilterComponent extends DateFilterMenuComponent implements OnInit, OnDestroy {
    @Input() public filter: CompositeFilterDescriptor;
    @Input() public filterService: FilterService;
    @Input() public field: string;
    @Input() public dateFormat: string;
    @Input() public dateFormatDesc: string;

    public firstOperator: string;
    public logicOperator: string;
    public secondOperator: string;
    public firstValue: Date;
    public secondValue: Date;

    private popupSubscription: any;

    constructor(
        private element: ElementRef,
        public popupService: SinglePopupService,
        public localization: LocalizationService) {

        super(localization);

        this.popupSubscription = popupService
            .onClose
            .subscribe((e: PopupCloseEvent) => {
                if (document.activeElement &&
                    closest(document.activeElement, node => node === this.element.nativeElement ||
                        (String(node.className).indexOf('k-grid-ignore-click') >= 0))) {
                    e.preventDefault();
                }
            });
    }

    ngOnInit() {
        this.refreshFilter();
    }

    private refreshFilter() {
        this.firstOperator = 'gte';
        this.logicOperator = this.filter.logic || 'and';
        this.secondOperator = 'gte';
        this.firstValue = null;
        this.secondValue = null;

        if (!this.filter.filters || this.filter.filters.length < 1) { return; }

        const firstFilter: FilterDescriptor = this.filter.filters[0] as FilterDescriptor;
        this.firstOperator = firstFilter.operator as string;
        this.firstValue = firstFilter.value;

        if (this.filter.filters.length < 2) { return; }

        const secondFilter: FilterDescriptor = this.filter.filters[1] as FilterDescriptor;
        this.secondOperator = secondFilter.operator as string;
        this.secondValue = secondFilter.value;
    }

    public changeFilter(value: any) {
        const atzFirstFilter: FilterDescriptor = this.makeFirstValue();
        const atzSecondFilter: FilterDescriptor = this.makeSecondValue();

        this.filter = this.removeFilter(this.field);

        if (!atzFirstFilter && !atzSecondFilter) { return; }

        const filters = [];
        if (atzFirstFilter) { filters.push(atzFirstFilter); }
        if (atzSecondFilter) { filters.push(atzSecondFilter); }

        const root = this.filter || { filters: [], logic: 'and' };

        root.filters.push(...filters);
        root.logic = this.logicOperator === 'and' ? 'and' : 'or';

        this.filterService.filter(root);
    }

    private makeFirstValue(): FilterDescriptor {
        if (this.firstOperator !== 'isnull' && this.firstOperator !== 'isnotnull') {
            if (this.firstValue === null || this.firstValue === undefined) { return null; }
        }
        return {
            field: this.field,
            operator: this.firstOperator,
            value: this.firstValue
        };
    }

    private makeSecondValue(): FilterDescriptor {
        if (this.secondOperator !== 'isnull' && this.secondOperator !== 'isnotnull') {
            if (this.secondValue === null || this.secondValue === undefined) { return null; }
        }
        return {
            field: this.field,
            operator: this.secondOperator,
            value: this.secondValue
        };
    }

    public ngOnDestroy(): void {
        this.popupSubscription.unsubscribe();
    }
}
