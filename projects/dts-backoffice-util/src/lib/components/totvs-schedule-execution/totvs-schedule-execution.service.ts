import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PoLookupFilteredItemsParams } from '@po-ui/ng-components';
import { ExecutionStatus, IExecutionParameters, IExecutionStatus } from './totvs-schedule-execution.model';

@Injectable()
export class TotvsScheduleExecutionService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };

    private urlCadServidor = '/dts/datasul-rest/resources/prg/btb/v1/servidoresExecucao';
    private urlJobScheduler = '/dts/datasul-rest/resources/prg/framework/v1/jobScheduler';
    private urlJobExecution = '/dts/datasul-rest/resources/prg/framework/v1/jobExecution';

    //private urlCadServidor = '/genericsZoom';
    //private urlJobScheduler = '/jobScheduler';
    //private urlJobExecution = '/jobExecution';

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

    createExecution(parameters: object, loading: boolean): Observable<any> {
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

        if (!params.programEMS5) { params.programEMS5 = false; }
        if (!params.programStyle) { params.programStyle = 0; }
        if (!params.programVersion) { params.programVersion = ''; }
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
                { chave: 'RPW_PRG_ESTILO', valor: params.programStyle },
                { chave: 'RPW_PRG_VERS', valor: params.programVersion },
                { parametros_negocio: params.businessParams }
            ]
        };

        if (params.paramDigitDef && params.paramDigitDef.length > 0) {
            jobScheduleParams.executionParameter.parametros.push({
                param_digita_def: params.paramDigitDef
            });
        }

        if (params.paramDigitData && params.paramDigitData.length > 0) {
            jobScheduleParams.executionParameter.parametros.push({
                param_digita_dados: params.paramDigitData
            });
        }

        if (params.paramSelections && params.paramSelections.length > 0) {
            jobScheduleParams.executionParameter.parametros.push({
                selecoes: params.paramSelections
            });
        }

        if (loading) {
            return this.http.post(`${this.urlJobScheduler}`, jobScheduleParams, this.headers);
        } else {
            return this.http.post(`${this.urlJobScheduler}`, jobScheduleParams);
        }
    }

    getExecutionByJobScheduleID(jobScheduleID: string, loading = false): Observable<IExecutionStatus> {
        const url = `${this.urlJobExecution}?jobScheduleID=${jobScheduleID}`;
        return this.getExecution(url, loading).pipe(
            map((response) => this.transformExecution('jobScheduleID', response))
        );
    }

    getExecutionByExecutionID(executionID: string, loading = false): Observable<IExecutionStatus> {
        const url = `${this.urlJobExecution}/${executionID}`;
        return this.getExecution(url, loading).pipe(
            map((response) => this.transformExecution('executionID', response))
        );
    }

    private getExecution(url: string, loading: boolean): Observable<any> {
        if (loading) {
            return this.http.get(url, this.headers);
        } else {
            return this.http.get(url);
        }
    }

    private transformExecution(type: string, response: any): IExecutionStatus {
        if (!response || !response.items || response.items.length === 0) { return; }
        response = response.items[0];

        const execStatus = new ExecutionStatus();
        execStatus.jobScheduleID = response.jobScheduleID;
        execStatus.executionID = response.executionID;
        execStatus.startedDate = response.startedDate;
        execStatus.error = response.error;
        execStatus.status = response.status;

        return execStatus;
    }

    followUpExcByJobScheduleID(jobScheduleID: string, intervalNum: number, fncCallBack: Function, loading = false): void {
        this.followUpExecution('jobScheduleID', jobScheduleID, intervalNum, fncCallBack, loading);
    }

    followUpExcByExecutionID(executionID: string, intervalNum: number, fncCallBack: Function, loading = false): void {
        this.followUpExecution('executionID', executionID, intervalNum, fncCallBack, loading);
    }

    private followUpExecution(type: string, execID: string,
        intervalNum: number, fncCallBack: Function, loading: boolean): void {

        this.jobExecutionSubscription$ = null;

        const intervalID = setInterval(() => {
            const execStatus = new ExecutionStatus();
            execStatus.jobScheduleID = (type === 'jobScheduleID') ? execID : '';
            execStatus.executionID = (type === 'executionID') ? execID : '';
            execStatus.startedDate = null;
            execStatus.error = '';
            execStatus.status = 'PENDING'; // PENDING, RUNNING, SUCCESS, FAILURE

            if (this.jobExecutionSubscription$) { return; }

            if (type === 'jobScheduleID') {
                this.jobExecutionSubscription$ = this.getExecutionByJobScheduleID(execID, loading)
                    .subscribe((response: IExecutionStatus) => {
                        this.followUpExecReturnOk(execID, execStatus, response, intervalID, fncCallBack);
                    }, (error) => {
                        this.followUpExecReturnError(error, execStatus, intervalID, fncCallBack);
                    });
            }

            if (type === 'executionID') {
                this.jobExecutionSubscription$ = this.getExecutionByExecutionID(execID, loading)
                    .subscribe((response: IExecutionStatus) => {
                        this.followUpExecReturnOk(execID, execStatus, response, intervalID, fncCallBack);
                    }, (error) => {
                        this.followUpExecReturnError(error, execStatus, intervalID, fncCallBack);
                    });
            }

        }, intervalNum);
    }

    private followUpExecReturnOk(execID: string, execStatus: IExecutionStatus, response: IExecutionStatus,
        intervalID: any, fncCallBack: Function): void {

        if (response) {
            execStatus = response;
        } else {
            execStatus.error = `Agendamento não encontrado com ID: ${execID}`;
            execStatus.status = 'FAILURE';
        }

        if (!fncCallBack(execStatus) ||
            execStatus.status === 'SUCCESS' ||
            execStatus.status === 'FAILURE') {
            clearInterval(intervalID);
        }

        this.jobExecutionSubscription$ = null;
    }

    private followUpExecReturnError(error: any, execStatus: IExecutionStatus,
        intervalID: any, fncCallBack: Function): void {

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
    }

    private addZero(num: number): string {
        let str = `${num}`;
        if (num < 10) { str = `0${num}`; }
        return str;
    }
}
