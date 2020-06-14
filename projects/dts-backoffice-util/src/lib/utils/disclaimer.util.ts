/*
Versão: 1.009
Data Criação: 06/08/2018
*/

import { PoDisclaimer, PoI18nPipe, PoCheckboxGroupOption, PoMultiselectOption } from '@po-ui/ng-components';
import { IFilterRangeCharacter, IFilterRangeNumber, IFilterRangeDate } from '../../lib/interfaces/filter-range.interface';
import { PoNotificationService } from '@po-ui/ng-components';

export class DisclaimerUtil {
    poNotification: PoNotificationService;
    poI18nPipe: PoI18nPipe;
    literals: any = {};

    constructor(
        poNotification: PoNotificationService,
        poI18nPipe: PoI18nPipe,
        literals: Object
    ) {
        this.poNotification = poNotification;
        this.poI18nPipe = poI18nPipe;
        this.literals = literals;
    }

    public makeDisclaimer(property: string, value: string, hideClose = false, tradValue = false, vldBlank = false): PoDisclaimer {
        if (value === null || value === undefined) {
            return { label: '', property: '', value: '' };
        }

        if (vldBlank && value === '') {
            return { label: '', property: '', value: '' };
        }

        return {
            hideClose,
            label: `${this.literals[property]}: ${tradValue ? this.literals[value] : value}`,
            property: `${property}`,
            value: `${value}`
        };
    }

    public makeDisclaimerFromNumber(property: string, value: number, hideClose = false, vldBlank = false): PoDisclaimer {
        if (value === null || value === undefined) {
            return { label: '', property: '', value: '' };
        }

        if (vldBlank && value === 0) {
            return { label: '', property: '', value: '' };
        }

        return {
            hideClose,
            label: `${this.literals[property]}: ${value}`,
            property: `${property}`,
            value: `${value}`
        };
    }

    public makeDisclaimerFromBoolean(property: string, value: boolean, hideClose = false): PoDisclaimer {
        if (value === null || value === undefined) {
            return { label: '', property: '', value: '' };
        }

        return {
            hideClose,
            label: `${this.literals[property]}: ${value ? this.literals['yes'] : this.literals['no']}`,
            property: `${property}`,
            value: `${value}`
        };
    }

    public makeDisclaimerFromDate(property: string, value: Date, hideClose = false): PoDisclaimer {
        const dDate: Date = this.ajustDate(value);

        if (!this.isValidDate(dDate)) {
            return { label: '', property: '', value: '' };
        }

        return {
            hideClose,
            label: `${this.literals[property]}: ${dDate.toLocaleDateString()}`,
            property: `${property}`,
            value: `${this.dateToQueryParam(dDate)}`
        };
    }

    public makeDisclaimerFromMultiSelect(property: string, value: Array<any>, length = 0,
        hideClose = false, tradValue = false): PoDisclaimer {
        let lstLabels = '';
        let lstValues = '';

        if (!value) {
            return { label: '', property: '', value: '' };
        }

        if (value.length === 0 || (length > 0 && value.length === length)) {
            lstLabels = this.literals['all'];
            lstValues = 'all';
        } else {
            value.map(item => {
                if (lstLabels !== '') { lstLabels = `${lstLabels}, `; }
                if (lstValues !== '') { lstValues = `${lstValues},`; }
                lstLabels = `${lstLabels}${tradValue ? this.literals[item] : item}`;
                lstValues = `${lstValues}${item}`;
            });
        }

        return {
            hideClose,
            label: `${this.literals[property]}: ${lstLabels}`,
            property: `${property}`,
            value: `${lstValues}`
        };
    }

    public makeDisclaimerFromCheckboxGroup(property: string, value: Array<string>, length = 0, hideClose = false): PoDisclaimer {
        let lstLabels = '';
        let lstValues = '';

        if (!value) {
            return { label: '', property: '', value: '' };
        }

        if (value.length === 0) {
            lstLabels = this.literals['none'];
            lstValues = 'none';
        } else if (length > 0 && value.length === length) {
            lstLabels = this.literals['all'];
            lstValues = 'all';
        } else {
            value.map(checkParam => {
                if (lstLabels !== '') { lstLabels = `${lstLabels}, `; }
                if (lstValues !== '') { lstValues = `${lstValues},`; }
                lstLabels = `${lstLabels}${this.literals[checkParam]}`;
                lstValues = `${lstValues}${checkParam}`;
            });
        }

        return {
            hideClose,
            label: `${this.literals[property]}: ${lstLabels}`,
            property: `${property}`,
            value: `${lstValues}`
        };
    }

    public makeDisclaimerFromRangeCharacter(property: string, value: IFilterRangeCharacter, hideClose = false,
        validateEqual = true): PoDisclaimer {
        if (value.valInitial === null || value.valInitial === undefined) { value.valInitial = value.iniInitial; }
        if (value.valFinal === null || value.valFinal === undefined) { value.valFinal = value.iniFinal; }

        if (validateEqual &&
            value.iniInitial === value.valInitial &&
            value.iniFinal === value.valFinal) {
            return { label: '', property: '', value: '' };
        }

        return {
            hideClose,
            label: this.poI18nPipe.transform(
                this.literals['filterRange'],
                [this.literals[property], `'${value.valInitial}'`, `'${value.valFinal}'`]),
            property: `${property}`,
            value: `${value.valInitial};${value.valFinal}`
        };
    }

    public makeDisclaimerFromRangeNumber(property: string, value: IFilterRangeNumber, hideClose = false,
        validateEqual = true): PoDisclaimer {
        if (value.valInitial === null || value.valInitial === undefined) { value.valInitial = value.iniInitial; }
        if (value.valFinal === null || value.valFinal === undefined) { value.valFinal = value.iniFinal; }

        if (validateEqual &&
            value.iniInitial === value.valInitial &&
            value.iniFinal === value.valFinal) {
            return { label: '', property: '', value: '' };
        }

        return {
            hideClose,
            label: this.poI18nPipe.transform(
                this.literals['filterRange'],
                [this.literals[property], value.valInitial, value.valFinal]),
            property: `${property}`,
            value: `${value.valInitial};${value.valFinal}`
        };
    }

    public makeDisclaimerFromRangeDate(property: string, value: IFilterRangeDate, hideClose = false, validateEqual = true): PoDisclaimer {
        let valInitDate: Date = this.ajustDate(value.valInitial);
        let valFinalDate: Date = this.ajustDate(value.valFinal);

        if (!this.isValidDate(valInitDate)) {
            valInitDate = value.iniInitial;
            value.valInitial = value.iniInitial;
        }
        if (!this.isValidDate(valFinalDate)) {
            valFinalDate = value.iniFinal;
            value.valFinal = value.iniFinal;
        }

        if (validateEqual &&
            this.dateToQueryParam(value.iniInitial) === this.dateToQueryParam(valInitDate) &&
            this.dateToQueryParam(value.iniFinal) === this.dateToQueryParam(valFinalDate)) {
            return { label: '', property: '', value: '' };
        }

        return {
            hideClose,
            label: this.poI18nPipe.transform(
                this.literals['filterRange'],
                [this.literals[property], valInitDate.toLocaleDateString(), valFinalDate.toLocaleDateString()]),
            property: `${property}`,
            value: `${this.dateToQueryParam(valInitDate)};${this.dateToQueryParam(valFinalDate)}`
        };
    }

    public atzCharFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string, defaultValue: string): string {
        let returnValue = defaultValue;

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null) { return false; }

                    returnValue = item.value;
                    return true;
                }
                return false;
            });
        }
        return returnValue;
    }

    public atzNumberFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string, defaultValue: number): number {
        let returnValue = defaultValue;

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null) { return false; }

                    returnValue = item.value;
                    return true;
                }
                return false;
            });
        }
        return returnValue;
    }

    public atzBooleanFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string, defaultValue: boolean): boolean {
        const returnValue = defaultValue;

        if (disclaimers && disclaimers.length > 0) {
            const disclaimerFind = disclaimers.find((item) => item.property === property);
            if (disclaimerFind && disclaimerFind.value !== null && disclaimerFind.value !== undefined) {
                if (disclaimerFind.value === 'true') {
                    return true;
                } else {
                    return false;
                }
            }
        }

        return returnValue;
    }

    public atzDateFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string, defaultValue: Date): Date {
        let returnValue: Date = this.ajustDate(defaultValue);

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null) { return false; }

                    returnValue = this.ajustDate(item.value);
                    return true;
                }
                return false;
            });
        }
        return returnValue;
    }

    public atzMultiSelectCharFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string,
        defaultValue: Array<PoMultiselectOption>): Array<string> {
        return this.atzMultiSelectFromDisclamer('char', disclaimers, property, defaultValue);
    }

    public atzMultiSelectNumberFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string,
        defaultValue: Array<PoMultiselectOption>): Array<number> {
        return this.atzMultiSelectFromDisclamer('number', disclaimers, property, defaultValue);
    }

    public atzMultiSelectFromDisclamer(type: string, disclaimers: Array<PoDisclaimer>, property: string,
        defaultValue: Array<PoMultiselectOption>): Array<any> {

        let returnValue = [];
        defaultValue.map(item => {
            returnValue.push(item.value);
        });

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null || item.value === 'all' || item.value === 'none') { return false; }

                    returnValue = [];
                    item.value.split(',').forEach(itemOpt => {
                        if (type === 'char') { returnValue.push(itemOpt); }
                        if (type === 'number') { returnValue.push(+itemOpt); }
                    });

                    return true;
                }
                return false;
            });
        }
        return returnValue;
    }

    public atzCheckboxFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string,
        options: Array<PoCheckboxGroupOption>): Array<string> {

        let returnValue = [];
        options.map(item => {
            returnValue.push(item.value);
        });

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null || item.value === 'all' || item.value === 'none') { return false; }

                    returnValue = [];
                    item.value.split(',').forEach(itemOpt => {
                        returnValue.push(itemOpt);
                    });

                    return true;
                }
                return false;
            });
        }
        return returnValue;
    }

    public atzRangeCharFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string,
        rangeChar: IFilterRangeCharacter): IFilterRangeCharacter {
        let value = '';

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null) { return false; }
                    value = item.value;
                    return true;
                }
                return false;
            });
        }
        return this.atzRangeCharFromQueryParam(value, rangeChar);
    }

    public atzRangeNumFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string,
        rangeNum: IFilterRangeNumber): IFilterRangeNumber {
        let value = '';

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null) { return false; }
                    value = item.value;
                    return true;
                }
                return false;
            });
        }
        return this.atzRangeNumFromQueryParam(value, rangeNum);
    }

    public atzRangeDateFromDisclamer(disclaimers: Array<PoDisclaimer>, property: string,
        rangeDate: IFilterRangeDate): IFilterRangeDate {
        let value = '';

        if (disclaimers && disclaimers.length > 0) {
            disclaimers.find((item) => {
                if (item.property === property) {
                    if (item.value === null) { return false; }
                    value = item.value;
                    return true;
                }
                return false;
            });
        }
        return this.atzRangeDateFromQueryParam(value, rangeDate);
    }

    public atzRangeCharFromQueryParam(value: string, rangeChar: IFilterRangeCharacter): IFilterRangeCharacter {
        rangeChar.valInitial = rangeChar.iniInitial;
        rangeChar.valFinal = rangeChar.iniFinal;

        if (!value || value === '') { return rangeChar; }

        rangeChar.valInitial = value.split(';')[0];
        rangeChar.valFinal = value.split(';')[1];
        if (rangeChar.valFinal === null || rangeChar.valFinal === undefined) { rangeChar.valFinal = rangeChar.iniFinal; }

        return rangeChar;
    }

    public atzRangeNumFromQueryParam(value: string, rangeNum: IFilterRangeNumber): IFilterRangeNumber {
        rangeNum.valInitial = rangeNum.iniInitial;
        rangeNum.valFinal = rangeNum.iniFinal;

        if (!value || value === '') { return rangeNum; }

        rangeNum.valInitial = +value.split(';')[0];
        rangeNum.valFinal = +value.split(';')[1];
        if (rangeNum.valFinal === null || rangeNum.valFinal === undefined) { rangeNum.valFinal = rangeNum.iniFinal; }

        return rangeNum;
    }

    public atzRangeDateFromQueryParam(value: string, rangeDate: IFilterRangeDate): IFilterRangeDate {
        rangeDate.valInitial = rangeDate.iniInitial;
        rangeDate.valFinal = rangeDate.iniFinal;

        if (!value || value === '') { return rangeDate; }

        rangeDate.valInitial = this.queryParamToDate(value.split(';')[0]);
        rangeDate.valFinal = this.queryParamToDate(value.split(';')[1]);
        if (rangeDate.valFinal === null || rangeDate.valFinal === undefined) { rangeDate.valFinal = rangeDate.iniFinal; }

        return rangeDate;
    }

    public dateToQueryParam(date: Date): string {
        const iDay = date.getDate();
        const iMonth = date.getMonth() + 1;
        const iYear = date.getFullYear();

        return `${iYear}-${this.pad(iMonth)}-${this.pad(iDay)}`;
    }

    public queryParamToDate(param: string): Date {
        const iDay = +param.split('-')[2];
        const iMonth = +param.split('-')[1];
        const iYear = +param.split('-')[0];

        return new Date(iYear, iMonth - 1, iDay);
    }

    public isValidDate(date: Date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    public ajustDate(param: any): Date {
        if (param instanceof Date) { return param; }
        if (!param) { return param; }

        return this.queryParamToDate(param.split('T')[0]);
    }

    public pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
}
