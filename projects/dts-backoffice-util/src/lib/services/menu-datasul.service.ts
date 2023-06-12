import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class MenuDatasulService {

    private urlMenuPrograms = '/dts/datasul-rest/resources/prg/fwk/v1/menuPrograms/list';

    constructor(private http: HttpClient) { }

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
        this.openHTMLProgram('THF2', programName, params, parent);
    }

    public openTHF(externalName: string, params: any, parent = true): void {
        this.openHTMLProgram('THF1', externalName, params, parent);
    }

    private openHTMLProgram(type: string, HTMLProgram: string, params: any, parent: boolean): void {
        const datasulPath = document.referrer.indexOf('totvs-menu') > 0 ? 'totvs-menu' : 'menu-html';

        HTMLProgram = HTMLProgram.replace(/\\/g, '/');
        if (HTMLProgram.charAt(0) === '/') { HTMLProgram = HTMLProgram.slice(1); }
        if (HTMLProgram.charAt(HTMLProgram.length - 1) === '/') { HTMLProgram = HTMLProgram.slice(0, -1); }

        let baseUrl = `/${datasulPath}/#/`;
        if (type === 'THF2') {
            baseUrl = `${baseUrl}${datasulPath}/program-html/${HTMLProgram}/`;
        } else {
            baseUrl = `${baseUrl}${HTMLProgram}`;
        }

        if (params) {
            if (baseUrl.charAt(baseUrl.length - 1) === '/') { baseUrl = baseUrl.slice(0, -1); }
            baseUrl = `${baseUrl}/#/${params}`;
        }

        if (parent) {
            window.open(baseUrl, '_parent');
        } else {
            window.open(baseUrl);
        }
    }

    public programSecurity(programName: string | Array<string>): Observable<Object> {
        let programList = [];
        if (Array.isArray(programName)) {
            programList = programName;
        } else {
            if (programName && programName !== '') {
                programList.push(programName);
            }
        }

        if (!programList || programList.length === 0) {
            return of({
                code: 400,
                message: 'Não foi possível validar a Segurança dos Programas, lista vazia !',
                detailedMessage: 'A lista de programas indicados para validação de segurança é inválida ou está vazia.'
            });
        }

        const aRequest = [];
        programList.forEach(programSearch => {
            aRequest.push(this.http.post<Object>(this.urlMenuPrograms, { search: programSearch }));
        });

        return forkJoin(aRequest).pipe(
            map((response: Object) => {
                if (!response) { return response; }
                if (!Array.isArray(response)) { return response; }

                const responseReturn = new Array<Object>();

                for (let idx = 0; idx < programList.length; idx++) {
                    const responseProg = response[idx];
                    let hasAcess = false;

                    if (responseProg && responseProg.programs &&
                        Array.isArray(responseProg.programs) &&
                        responseProg.programs.length > 0) {

                        responseProg.programs.forEach(prog => {
                            if (prog.prg === programList[idx]) {
                                hasAcess = true;
                            }
                        });
                    }

                    responseReturn.push({
                        programName: programList[idx],
                        hasAccess: hasAcess
                    });
                }

                return responseReturn;
            })
        );
    }
}

