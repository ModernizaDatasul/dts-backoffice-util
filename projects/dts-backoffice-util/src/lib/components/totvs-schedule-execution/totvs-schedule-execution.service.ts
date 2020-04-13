import { map } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoComboOption, PoComboFilter } from '@po-ui/ng-components';

@Injectable()

export class RpwService implements PoComboFilter {

    // private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/usersConfigApp';
    private apiUrl = '/dts/datasul-rest/resources/prg/cdp/v1/genericsZoom';
    private urlJobScheduler = '/dts/datasul-rest/resources/prg/framework/v1/jobScheduler';

    constructor(public http: HttpClient) { }

    public readonly filterRpw = {
         fields: 'cod_servid_exec,des_servid_exec',
         filter: 'cod_servid_exec',
         filterZoom: 'cod_servid_exec',
         order: 'cod_servid_exec',
         table: 'servid_exec'
    };

    getFilteredData(param: any, appId: number): Observable<Array<PoComboOption>> {
        const localParams = Object.assign({}, this.filterRpw);
        let url  = `${this.apiUrl}?pageSize=10&page=1&table=${localParams.table}`;
            url += `&fields=${localParams.fields}&order=${localParams.order}`;

        if (param.value) {
            url += `&${localParams.filterZoom}=*${param.value}*`;
        }

        return this.http.get(url, { })
            .pipe(map((response: any) => this.convertToArrayComboOption(response.items, 'codServidExec', 'desServidExec')));
    }

    getObjectByValue(value): Observable<PoComboOption> {
        return this.http.get(`${this.apiUrl}/${value}`)
            .pipe(map(item => this.convertToThfComboOption(item, 'codServidExec', 'desServidExec')));
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
            return items.map(item => this.convertToThfComboOption(item, key, value));
        }

        return [];
    }

    convertToThfComboOption(item: any, key: string, value: string): PoComboOption {
        item = item || {};
        return {
            value: item[key] || undefined,
            label: item[value] || undefined
        };
    }
    /* COMBO */

}
