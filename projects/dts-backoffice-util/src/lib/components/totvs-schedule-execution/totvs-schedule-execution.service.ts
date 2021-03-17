import { map } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoComboOption, PoComboFilter } from '@po-ui/ng-components';

@Injectable()

export class RpwService implements PoComboFilter {

    private apiUrl = '/dts/datasul-rest/resources/prg/btb/v1/servidoresExecucao';
    private urlJobScheduler = '/dts/datasul-rest/resources/prg/framework/v1/jobScheduler';
    // private apiUrl = '/genericsZoom';
    // private urlJobScheduler = '/jobScheduler';

    constructor(public http: HttpClient) { }

    getFilteredData(params: any, filterParams?: any): Observable<Array<PoComboOption>> {
        let url = this.apiUrl;

        if (params && params.value) {
            url = `${url}?quickSearch=${params.value}`;
        }

        return this.http.get(`${url}`, { })
            .pipe(map((response: any) => this.convertToArrayComboOption(response.items, 'code', 'name')));
    }

    getObjectByValue(value): Observable<PoComboOption> {
        return this.http.get(`${this.apiUrl}/${value}`)
            .pipe(map(item => this.convertToPoComboOption(item, 'code', 'name')));
    }

    createRpw(parameters: Object): Observable<any> {
        const params = JSON.parse(JSON.stringify(parameters).replace(/\\\\/g, '*|'));

        return this.http.post(
            `${this.urlJobScheduler}`, params
        );
    }

    /* COMBO */
    convertToArrayComboOption(items: Array<any>, key: string, value: string): Array<PoComboOption> {
        if (items && items.length > 0) {
            return items.map(item => this.convertToPoComboOption(item, key, value));
        }

        return [];
    }

    convertToPoComboOption(item: any, key: string, value: string): PoComboOption {
        item = item || {};
        return {
            value: item[key] || undefined,
            label: item[value] || undefined
        };
    }
    /* COMBO */
}
