import { Injectable } from '@angular/core';

@Injectable()
export class MenuDatasulService {

    constructor() { }

    /**
     * var program = {};
     * program['prg'] = "cd0210";
     * program['params'] = '01|123456'
     */
    public callProgress(program) {
        parent.postMessage({ program }, '*');
    }

    /**
     * var notification = {};
     * notification['type'] = 'success';
     * notification['title'] = 'Notification Title'
     * notification['detail'] = 'Notification Detail'
     */
    public sendNotification(notification) {
        parent.postMessage({ notification }, '*');
    }

    public openPath(programName: string, params: any, parent = true): void {
        const datasulPath = document.referrer.indexOf('totvs-menu') > 0 ? 'totvs-menu' : 'menu-html';
        const baseUrl = `/${datasulPath}/#/${datasulPath}/program-html/${programName}/#`;

        if (parent) {
            window.open(`${baseUrl}/${params}`, '_parent');
        } else {
            window.open(`${baseUrl}/${params}`);
        }
    }
}
