/*
Versão: 1.003
Data Criação: 06/08/2018
*/

import { Injectable } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class BreadcrumbControlService {
    breadcrumb: PoBreadcrumb;

    constructor() { }

    public newBreadcrumb(): void {
        this.breadcrumb = { items: [] };
    }

    public addBreadcrumb(literal: string, activatedRoute: ActivatedRoute): void {
        this.addBreadcrumbURL(literal, decodeURIComponent(activatedRoute.snapshot['_routerState'].url));
    }

    public addBreadcrumbURL(literal: string, url: string): void {
        if (!literal || literal === '') { return; }
        if (!this.breadcrumb) { this.newBreadcrumb(); }

        const breadcrumbAux = { items: [] };

        let idx = 0;
        for (idx = 0; idx < this.breadcrumb.items.length; idx++) {
            if (this.breadcrumb.items[idx].label !== literal) {
                breadcrumbAux.items.push(this.breadcrumb.items[idx]);
            } else {
                break;
            }
        }

        breadcrumbAux.items.push({ label: literal, link: url });

        this.breadcrumb = breadcrumbAux;
    }

    public updBreadcrumbURL(literal: string, valueOld: string, valueNew: string): void {
        let currentRouterURL = this.getCurrentRouter();

        if (!currentRouterURL) { return; }
        if (!valueOld) { return; }
        if (!valueNew) { return; }

        currentRouterURL = currentRouterURL.replace(valueOld, valueNew);
        this.addBreadcrumbURL(literal, currentRouterURL);
    }

    public getBreadcrumb(): PoBreadcrumb {
        if (!this.breadcrumb) { this.newBreadcrumb(); }
        return this.breadcrumb;
    }

    public getCurrentRouter(): string {
        if (!this.breadcrumb) { this.newBreadcrumb(); }
        if (this.breadcrumb.items.length <= 0) { return ''; }

        return this.breadcrumb.items[this.breadcrumb.items.length - 1].link;
    }

    public getPrevRouter(): string {
        if (!this.breadcrumb) { this.newBreadcrumb(); }
        if (this.breadcrumb.items.length <= 1) { return ''; }

        return this.breadcrumb.items[this.breadcrumb.items.length - 2].link;
    }

    public hasPreviousRouter(): boolean {
        return this.breadcrumb.items.length > 1;
    }
}
