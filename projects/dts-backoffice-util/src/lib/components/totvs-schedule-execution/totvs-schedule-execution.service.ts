import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { PoLookupFilteredItemsParams } from '@po-ui/ng-components';
import { ExecutionStatus, IExecutionParameters } from './totvs-schedule-execution.model';

@Injectable()
export class TotvsScheduleExecutionService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };

    private urlCadServidor = '/dts/datasul-rest/resources/prg/btb/v1/servidoresExecucao';
    private urlJobScheduler = '/dts/datasul-rest/resources/prg/framework/v1/jobScheduler';
    private urlJobExecution = '/dts/datasul-rest/resources/prg/framework/v1/jobExecution';

    // private urlCadServidor = '/genericsZoom';
    // private urlJobScheduler = '/jobScheduler';

    private jobExecutionSubscription$: Subscription;

    constructor(public http: HttpClient) { }

    getFilteredItems(params: PoLookupFilteredItemsParams): Observable<any> {
        const urlParams = new Array<string>();

        urlParams.push(`pageSize=${params.pageSize.toString()}`);
        urlParams.push(`page=${params.page.toString()}`);

        if (params.filter && params.filter.length > 0) {
            urlParams.push(`quickSearch=${params.filter}`);
        }

        return this.http.get(`${this.urlCadServidor}?${urlParams.join('&')}`);
    }

    getObjectByValue(id: string): Observable<any> {
        return this.http.get<any>(`${this.urlCadServidor}/${id}`, this.headers);
    }

    createExecution(parameters: Object, loading: boolean): Observable<any> {
        const params = JSON.parse(JSON.stringify(parameters).replace(/\\\\/g, '*|'));

        if (loading) {
            return this.http.post(`${this.urlJobScheduler}`, params, this.headers);
        } else {
            return this.http.post(`${this.urlJobScheduler}`, params);
        }
    }

    createExecutionForNow(executionParams: IExecutionParameters, loading: boolean): Observable<any> {
        let jobScheduleParams: any;
        const date = new Date();

        const params = JSON.parse(JSON.stringify(executionParams).replace(/\\\\/g, '*|'));
        if (!params.businessParams || params.businessParams.length === 0) {
            params.businessParams = [{ chave: '', valor: '' }];
        }

        jobScheduleParams = {};
        jobScheduleParams.status = 'active';
        jobScheduleParams.processID = params.programName;
        jobScheduleParams.firstExecution = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}T${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}:00.000Z`;
        jobScheduleParams.recurrent = false;

        jobScheduleParams.executionParameter = {
            parametros: [
                { chave: 'rpwServer', valor: params.executionServer },
                { chave: 'RPW_PROGRAM', valor: params.externalName },
                { chave: 'RPW_PRG_EMS5', valor: params.programEMS5 ? 'yes' : 'no' },
                { chave: 'RPW_PRG_VERS', valor: params.programVersion },
                { parametros_negocio: params.businessParams }
            ]
        };

        if (loading) {
            return this.http.post(`${this.urlJobScheduler}`, jobScheduleParams, this.headers);
        } else {
            return this.http.post(`${this.urlJobScheduler}`, jobScheduleParams);
        }
    }

    getExecutionByJobScheduleID(jobScheduleID: string, loading: boolean): Observable<any> {
        const url = `${this.urlJobExecution}?jobScheduleID=${jobScheduleID}`;

        if (loading) {
            return this.http.get(url, this.headers);
        } else {
            return this.http.get(url);
        }
    }

    followUpExecution(jobScheduleID: string, intervalNum: number, fncCallBack: Function): void {
        this.jobExecutionSubscription$ = null;

        const intervalID = setInterval(() => {
            const execStatus = new ExecutionStatus();
            execStatus.startedDate = null;
            execStatus.executionID = '';
            execStatus.error = '';
            execStatus.status = 'PENDING'; // PENDING, RUNNING, SUCCESS, FAILURE

            if (this.jobExecutionSubscription$) { return; }

            this.jobExecutionSubscription$ = this.getExecutionByJobScheduleID(jobScheduleID, false)
                .subscribe((response: any) => {

                    if (response && response.items && response.items.length > 0) {
                        execStatus.startedDate = response.items[0].startedDate;
                        execStatus.executionID = response.items[0].executionID;
                        execStatus.error = response.items[0].error;
                        execStatus.status = response.items[0].status;
                    } else {
                        execStatus.error = `Agendamento não encontrado com jobScheduleID: ${jobScheduleID}`;
                        execStatus.status = 'FAILURE';
                    }

                    if (!fncCallBack(execStatus) ||
                        execStatus.status === 'SUCCESS' ||
                        execStatus.status === 'FAILURE') {
                        clearInterval(intervalID);
                    }

                    this.jobExecutionSubscription$ = null;
                }, (error) => {
                    let erroDesc = '';

                    if (error instanceof HttpErrorResponse) {
                        erroDesc = error.message;
                        if (error.error) {
                            erroDesc = '';
                            if (error.error.code) { erroDesc = error.error.code; }
                            if (error.error.message) { erroDesc = `${erroDesc} - ${error.error.message}`; }
                            if (error.error.detailedMessage) { erroDesc = `${erroDesc} - ${error.error.detailedMessage}`; }
                        }
                    } else {
                        erroDesc = error;
                    }

                    execStatus.error = erroDesc;
                    execStatus.status = 'FAILURE';
                    fncCallBack(execStatus);
                    clearInterval(intervalID);
                    this.jobExecutionSubscription$ = null;
                });
        }, intervalNum);
    }

    private addZero(num: number): string {
        let str = `${num}`;
        if (num < 10) { str = `0${num}`; }
        return str;
    }
}
