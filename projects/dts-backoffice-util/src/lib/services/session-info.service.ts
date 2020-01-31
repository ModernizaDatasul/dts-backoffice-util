import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISessionInfo } from '../model/session-info.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    readonly apiUrl = '/totvs-menu/rest/getSessionInfo';
    userLogin = undefined;

    constructor(public http: HttpClient) { }

    getUserLogin(): Observable<string> {
        if (localStorage.getItem('username')) {
            return of(localStorage.getItem('username'));
        }

        if (this.userLogin) {
            return of(this.userLogin);
        } else {
            return this.http.get<ISessionInfo>(`${this.apiUrl}`)
                .pipe(map((response) => {
                    this.userLogin = response.userName;
                    return response.userName;
                }));
        }
    }
}
