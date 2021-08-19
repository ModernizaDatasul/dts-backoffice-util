import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoLookupFilteredItemsParams } from '@po-ui/ng-components';

@Injectable()
export class RpwService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };

    private apiUrl = '/dts/datasul-rest/resources/prg/btb/v1/servidoresExecucao';
    private urlJobScheduler = '/dts/datasul-rest/resources/prg/framework/v1/jobScheduler';
    // private apiUrl = '/genericsZoom';
    // private urlJobScheduler = '/jobScheduler';

    constructor(public http: HttpClient) { }

    getFilteredItems(params: PoLookupFilteredItemsParams): Observable<any> {
        const urlParams = new Array<string>();

        urlParams.push(`pageSize=${params.pageSize.toString()}`);
        urlParams.push(`page=${params.page.toString()}`);

        if (params.filter && params.filter.length > 0) {
            urlParams.push(`quickSearch=${params.filter}`);
        }

        return this.http.get(`${this.apiUrl}?${urlParams.join('&')}`);
    }

    getObjectByValue(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, this.headers);
    }

    createRpw(parameters: Object, loading: boolean): Observable<any> {
        const params = JSON.parse(JSON.stringify(parameters).replace(/\\\\/g, '*|'));

        if (loading) {
            return this.http.post(`${this.urlJobScheduler}`, params, this.headers);
        } else {
            return this.http.post(`${this.urlJobScheduler}`, params);
        }
    }
}
