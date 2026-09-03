import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {
    constructor(public http: HttpClient) { }

    getUserLogin(): Observable<string> {
        if (sessionStorage.getItem('username')) {
            return of(sessionStorage.getItem('username'));
        }

        if (localStorage.getItem('username')) {
            return of(localStorage.getItem('username'));
        }

        return of(undefined);
    }
}
