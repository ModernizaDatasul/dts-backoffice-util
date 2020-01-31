import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

export interface IProperty {
    name: string;
    value: string;
}

export interface IReportServiceParams {
    reportName: string;
    programName: string;
    properties: Array<IProperty>;
    dialect: string;
    downloadName: string;
    download: boolean;
    format: ReportFormats;
}

export enum ReportFormats {
    XLSX = 'xlsx',
    PDF = 'pdf',
    DOCX = 'docx',
    HTML = 'html'
}

@Injectable()

export class ReportService {
    public readonly URL = '/dts/datasul-report/resources/run/';

    constructor(public httpClient: HttpClient) { }

    generate(params: IReportServiceParams, showLoading: boolean = true): Observable<Blob> {
        const headers = { 'X-Portinari-Screen-Lock': showLoading ? 'true' : 'false'};

        let reportURL = `${this.URL}${params.reportName}`;

        if (params.properties.length > 0) {
            reportURL += '?';

            params.properties.forEach((property: IProperty) => {
                reportURL += `c_properties=${property.name}&c_values=${property.value}`;
            });
        }

        reportURL += `&dialect=${params.dialect}&format=${params.format}`;
        reportURL += `&program=${params.programName}&resultFileName=${params.downloadName}`;

        return this.httpClient.post(reportURL, {}, { headers, responseType: 'blob' })
                              .pipe(map(report => {
            if (params.download) {
                this.download(report, `${params.reportName}.${params.format}` );
            }
            return report;
        }));
    }

    download(file: Blob, fileName: string) {
        const binaryData = [file];
        const downloadLink = document.createElement('a');
        const urlDownload = window.URL.createObjectURL(new Blob(binaryData, { type: file.type }));

        downloadLink.href = urlDownload;
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        window.URL.revokeObjectURL(urlDownload);
        downloadLink.remove();
    }
}
