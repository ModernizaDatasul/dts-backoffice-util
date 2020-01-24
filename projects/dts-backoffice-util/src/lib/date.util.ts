/*
Versão: 1.000
Data Criação: 18/04/2019
*/

export class DateUtil {

    constructor(
    ) { }

    /* Transforma data para o padrão YYYY-MM-DD */
    static dateToQueryParam(date: Date): string {
        const iDay = date.getDate();
        const iMonth = date.getMonth() + 1;
        const iYear = date.getFullYear();

        return `${iYear}-${this.pad(iMonth)}-${this.pad(iDay)}`;
    }

    /* Transforma data no padrão YYYY-MM-DD para DATE */
    static queryParamToDate(param: string): Date {
        const iDay = +param.split('-')[2];
        const iMonth = +param.split('-')[1];
        const iYear = +param.split('-')[0];

        return new Date(iYear, iMonth - 1, iDay);
    }

    /* Valida se foi informado uma data válida */
    static isValidDate(date: Date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    /* Ajusta a data retornando o padrão DATE */
    static ajustDate(param: any): Date {
        if (param instanceof Date) { return param; }
        if (!param) { return param; }

        return this.queryParamToDate(param.split('T')[0]);
    }

    /* Ajusta a data para o padrão DATE - utilizada nos construtores dos modelos */
    static ajustDateToModel(values: Object = {}, fieldName: string): Date {
        if (values.hasOwnProperty(fieldName) && (values[fieldName])) {
            if (values[fieldName].indexOf('T') >= 0) {
                return new Date(values[fieldName]);
            }

            const iDay = +values[fieldName].split('-')[2];
            const iMonth = +values[fieldName].split('-')[1];
            const iYear = +values[fieldName].split('-')[0];
            return new Date(iYear, iMonth - 1, iDay);
        }

        return null;
    }

    /* Adicona zero a esquerda do número */
    static pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
}
