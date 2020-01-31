import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CacheParamsService {

    values = {};

    constructor() { }

    public setValue(key: string, value: any) {
        this.values[key] = value;
    }

    public getValue(key: string): any {
        return this.values[key];
    }

    public removeValue(key: string): void {
        delete this.values[key];
    }
}
