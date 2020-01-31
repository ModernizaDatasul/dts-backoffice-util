/*
Versão: 1.002
Data Criação: 19/02/2019
*/

import { PoNotificationService, PoI18nPipe } from '@portinari/portinari-ui';
import { DisclaimerUtil } from './disclaimer.util';

export class FieldValidationUtil {
    poNotification: PoNotificationService;
    poI18nPipe: PoI18nPipe;
    literals: any = {};

    disclaimerUtil: DisclaimerUtil;

    constructor(
        poNotification: PoNotificationService,
        poI18nPipe: PoI18nPipe,
        literals: Object
    ) {
        this.poNotification = poNotification;
        this.poI18nPipe = poI18nPipe;
        this.literals = literals;
        this.disclaimerUtil = new DisclaimerUtil(this.poNotification, this.poI18nPipe, this.literals);
    }

    public vldFieldCharacter(field: string, value: string): boolean {
        if (!value || value.trim() === '') {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldRequered'], [this.literals[field]])
            });
            return false;
        }
        return true;
    }

    // Valida uma faixa de caracteres se o inicial é menor que final
    public vldRangeCharacter(initialField: string, finalField: string, initialValue: string, finalValue: string): boolean {
        if (!initialValue || !finalValue) {
            return true;
        }

        if (initialValue.trim().toUpperCase() > finalValue.trim().toUpperCase()) {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldRange'],
                    [this.literals[initialField], this.literals[finalField]])
            });
            return false;
        }
        return true;
    }

    public vldFieldNumber(field: string, value: number, vldValue = false, zeroAccept = false): boolean {
        if (vldValue && !this.vldValueOfNumber(field, value)) {
            return false;
        }

        if ((!value) || value <= 0) {
            if (value === 0 && zeroAccept === true) {
                return true;
            }

            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldRequered'], [this.literals[field]])
            });
            return false;
        }
        return true;
    }

    public vldValueOfNumber(field: string, value: number): boolean {
        if (value && value < 0) {
            this.poNotification.error(
                { message: this.poI18nPipe.transform(this.literals['fieldVldNumber'], [value.toString(), this.literals[field]]) });
            return false;
        }
        return true;
    }

    public vldFieldPercent(field: string, value: number, vldValue = false): boolean {
        if (vldValue && !this.vldValueOfPercent(field, value)) {
            return false;
        }

        if (!this.vldFieldNumber(field, value)) {
            return false;
        }
        return true;
    }

    public vldValueOfPercent(field: string, value: number): boolean {
        if (value && value < 0) {
            this.poNotification.error(
                { message: this.poI18nPipe.transform(this.literals['fieldVldNumber'], [value.toString(), this.literals[field]]) });
            return false;
        }

        if (value && value > 100) {
            this.poNotification.error(
                { message: this.poI18nPipe.transform(this.literals['fieldVldNumber'], [value.toString(), this.literals[field]]) });
            return false;
        }
        return true;
    }

    // Valida uma faixa de números se o inicial é menor que final
    public vldRangeNumber(initialField: string, finalField: string, initialValue: number, finalValue: number): boolean {
        if (!initialValue) { initialValue = 0; }
        if (!finalValue) { finalValue = 0; }

        if (initialValue > finalValue) {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldRange'],
                    [this.literals[initialField], this.literals[finalField]])
            });
            return false;
        }
        return true;
    }

    public vldFieldDate(field: string, value: Date): boolean {
        const valDate = this.disclaimerUtil.ajustDate(value);

        if (!this.disclaimerUtil.isValidDate(valDate)) {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldDate'], [this.literals[field]])
            });
            return false;
        }
        return true;
    }

    // Valida uma faixa de datas se o inicial é menor que final
    public vldRangeDate(initialField: string, finalField: string, initialValue: Date, finalValue: Date): boolean {
        if (!initialValue || !finalValue) {
            return true;
        }

        const valInitialDate = this.disclaimerUtil.ajustDate(initialValue).getTime();
        const valFinalDate = this.disclaimerUtil.ajustDate(finalValue).getTime();

        if (valInitialDate > valFinalDate) {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldRange'],
                    [this.literals[initialField], this.literals[finalField]])
            });
            return false;
        }
        return true;
    }

    public vldFieldMultiSelect(field: string, value: Array<any>): boolean {
        if (!value || value.length === 0) {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldSelected'], [this.literals[field]])
            });
            return false;
        }
        return true;
    }

    public vldFieldCheckbox(field: string, value: Array<string>): boolean {
        if (!value || value.length === 0) {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldSelected'], [this.literals[field]])
            });
            return false;
        }
        return true;
    }

    // Valida formato conforme regra: "9" apenas números, "X" qualquer caracter, "!" apenas letras maiúsculas
    public vldFieldFormat(field: string, value: string, format: string, replacePoint = false): boolean {
        let lOK = true;
        let oldFormat: string;

        if (!value) { return lOK; }

        /*Retira os pontos do formato*/
        if (replacePoint) {
            oldFormat = format;
            format = format.replace(/\./g, '');
        }

        if (value.length !== format.length) {
            lOK = false;
        } else {
            for (let idx = 0; idx < format.length; idx++) {
                if (format[idx] === '9') {
                    if (value[idx].replace(/[0-9]/, '9') !== '9') { lOK = false; break; }
                }

                if (format[idx] === '!') {
                    if (value[idx].replace(/[A-Z]/, 'A') !== 'A') { lOK = false; break; }
                }
            }
        }

        if (replacePoint) {
            format = oldFormat;
        }

        if (!lOK) {
            this.poNotification.error({
                message: this.poI18nPipe.transform(this.literals['fieldVldFormat'], [this.literals[field], format])
            });
        }

        return lOK;
    }
}
