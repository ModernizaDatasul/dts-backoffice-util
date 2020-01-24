/*
Versão: 1.000
Data Criação: 06/08/2018
*/

import { IFilterRangeCharacter, IFilterRangeNumber, IFilterRangeDate } from '../lib/interfaces/filter-range.interface';

export class FilterRangeUtil {

    constructor() {
    }

    public static makeFilterRangeCharacter(iniInitial: string, iniFinal: string): IFilterRangeCharacter {
        return {
            iniInitial: iniInitial,
            iniFinal: iniFinal,
            valInitial: iniInitial,
            valFinal: iniFinal
        };
    }

    public static makeFilterRangeNumber(iniInitial: number, iniFinal: number): IFilterRangeNumber {
        return {
            iniInitial: iniInitial,
            iniFinal: iniFinal,
            valInitial: iniInitial,
            valFinal: iniFinal
        };
    }

    public static makeFilterRangeDate(iniInitial: Date, iniFinal: Date): IFilterRangeDate {
        return {
            iniInitial: iniInitial,
            iniFinal: iniFinal,
            valInitial: iniInitial,
            valFinal: iniFinal
        };
    }
}
