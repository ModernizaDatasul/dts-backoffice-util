import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface IProfile {
    pageId: string;
    dataCode: string;
    userCode: string;
    dataValue?: string;
}

export interface IProfileResponse {
    message: Array<string>;
    length: number;
    data: Array<any>;
}

enum EDataType {
    STRING = 1,
    JSON = 2
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    readonly apiURL = '/dts/datasul-rest/resources/api/btb/btapi930za';

    constructor(public http: HttpClient) { }

    setProfile(profile: IProfile, showLoading = true): Observable<any> {
        const headers = { 'X-PO-Screen-Lock': showLoading ? 'true' : 'false' };
        const { pageId, userCode } = profile;

        return this.http
            .post<any>(`${this.apiURL}/setProfile?userCode=${userCode}&pageId=${pageId}`, profile, { headers });

    }

    getProfileAsString(profile: IProfile, showLoading = false): Observable<string> {
        return this.getProfile(profile, EDataType.STRING, showLoading);
    }

    getProfileAsJSON(profile: IProfile, showLoading = false): Observable<object> {
        return this.getProfile(profile, EDataType.JSON, showLoading);
    }

    private getProfile(profile: IProfile, dataType: EDataType, showLoading = false): Observable<any> {
        const headers = { 'X-PO-Screen-Lock': showLoading ? 'true' : 'false' };
        const { pageId, dataCode, userCode } = profile;

        return this.http
            .get<IProfileResponse>(`${this.apiURL}/getProfile?userCode=${userCode}&pageId=${pageId}&dataCode=${dataCode}`,
                { headers })
            .pipe(map(preference => {
                if (preference.data[0]) {
                    if (dataType === EDataType.STRING) {
                        return preference.data[0].dataValue;
                    }

                    if (dataType === EDataType.JSON) {
                        return JSON.parse(preference.data[0].dataValue);
                    }
                } else {
                    return undefined;
                }
            }));
    }

}
