import { Injectable } from '@angular/core';

@Injectable()
export class TranslateService {

    static getSuportLanguage() {
        return ['pt-BR', 'pt', 'en-US', 'en', 'es'];
    }

    static getDefaultCurrencyCode() {
        return '$';
    }

    static getCurrentLanguage() {
        const locale = localStorage.getItem('user.language') || navigator.language;

        if (locale || this.getSuportLanguage().includes(locale)) { return locale; }

        return 'en-US';
    }
}
