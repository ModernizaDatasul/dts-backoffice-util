export class FileUtil {

    constructor(
    ) { }

    static downloadFile(data: any, fileName: string, contentType?: string, base64?: boolean): void {
        base64 = (base64 === false) ? false : true;
        const dataBlob = base64 ? this.b64toBlob(data, contentType) : data;
        this.download(dataBlob, fileName);
    }

    static downloadData(data: Array<any>, dwldDataParam: IDownloadDataParams = null): void {
        if (!data) { return; }

        if (!dwldDataParam) { dwldDataParam = new DownloadDataParams(); }
        if (!dwldDataParam.fileName) { dwldDataParam.fileName = 'data.csv'; }
        if (!dwldDataParam.literals) { dwldDataParam.literals = {}; }
        if (!dwldDataParam.columnDelimiter) { dwldDataParam.columnDelimiter = ';'; }
        if (!dwldDataParam.columnList) { dwldDataParam.columnList = []; }
        if (!dwldDataParam.columnExclude) { dwldDataParam.columnExclude = []; }

        const datab64 = btoa(this.jsonToString(data, dwldDataParam));
        this.downloadFile(datab64, dwldDataParam.fileName, 'text/csv');
    }

    private static download(file: Blob, fileName: string): void {
        const binaryData = [file];
        const downloadLink = document.createElement('a');
        const urlDownload = window.URL.createObjectURL(new Blob(binaryData, { type: file.type }));

        /* Verifica se é ie ou edge, pois o mesmo tem tratamento próprio para arquivos blob */
        const nav = (window.navigator as any);
        if (nav && nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(file, fileName);
        } else {
            downloadLink.href = urlDownload;
            downloadLink.setAttribute('download', fileName);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            window.URL.revokeObjectURL(urlDownload);
            downloadLink.remove();
        }
    }

    static b64toBlob(b64Data: any, contentType?: string, sliceSize?: number): Blob {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    private static jsonToString(jsonData: Array<any>, dwldDataParam: IDownloadDataParams): string {
        if (!jsonData || jsonData.length === 0) { return ''; }

        const lineDelimiter = '\n';

        let columnOrig = null;
        let columnHeader = null;
        const keys = [];
        let includeKey: boolean;

        if (dwldDataParam.columnList &&
            dwldDataParam.columnList.length > 0) {
            columnOrig = dwldDataParam.columnList;
        } else {
            columnOrig = Object.keys(jsonData[0]);
        }

        columnOrig.forEach(key => {
            includeKey = true;

            if (dwldDataParam.columnExclude &&
                dwldDataParam.columnExclude.length > 0 &&
                dwldDataParam.columnExclude.indexOf(key) !== -1) {
                includeKey = false;
            }

            if (includeKey) {
                keys.push(key);
                columnHeader = (!columnHeader) ? '' : columnHeader + dwldDataParam.columnDelimiter;
                columnHeader += (dwldDataParam.literals[key]) ? dwldDataParam.literals[key] : key;
            }
        });

        const lineStr = jsonData.reduce((accLineStr, currentItem) => {
            let first = true;
            let columnValue = null;

            keys.forEach(key => {
                if (!first) { accLineStr += dwldDataParam.columnDelimiter; }

                columnValue = currentItem[key];
                if (columnValue === null || columnValue === undefined) { columnValue = ''; }
                switch (typeof (columnValue)) {
                    case 'number':
                        columnValue = columnValue.toLocaleString();
                        break;
                    case 'boolean':
                        columnValue = (dwldDataParam.literals[`${columnValue}`]) ?
                            dwldDataParam.literals[`${columnValue}`] : columnValue;
                        break;
                    case 'object':
                        columnValue = JSON.stringify(columnValue);
                }
                accLineStr += columnValue;

                first = false;
            });

            return accLineStr + lineDelimiter;

        }, columnHeader + lineDelimiter);

        return lineStr;
    }

    static fileToB64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                let cntFile: any;
                cntFile = reader.result;
                if (!cntFile) {
                    reject('File not found or Empty');
                    return;
                }

                const aCnt = cntFile.split(',');
                if (aCnt && aCnt.length >= 2) {
                    resolve(aCnt[1]);
                } else {
                    reject('File not found or Empty');
                }

            };

            reader.onerror = error => reject(error);
        });
    }
}

export interface IDownloadDataParams {
    fileName: string;
    literals: any;
    columnDelimiter: string;
    columnList: Array<string>;
    columnExclude: Array<string>;
}

export class DownloadDataParams implements IDownloadDataParams {
    fileName: string;
    literals: any;
    columnDelimiter: string;
    columnList: Array<string>;
    columnExclude: Array<string>;
}
