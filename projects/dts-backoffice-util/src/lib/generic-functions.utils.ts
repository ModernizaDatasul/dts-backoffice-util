/*
Versão: 1.003
Data Criação: 18/04/2019
*/

import { PoMultiselectOption, PoSelectOption } from '@portinari/portinari-ui';

export interface ChartSeries {
      name?: string;
      data?: Array<number>;
}
export interface ChartValues {
    minValue: number;
    maxValue: number;
}

export class GenericFunctionsUtils {

    literals: any = {};

    constructor(
        literals: Object
    ) {
        this.literals = literals;
    }

    /* Transforma uma Lista separada por "," em um Array */
    static listToArrayCharacter(list: string): Array<string> {
        let returnArray = new Array<string>();

        if (list && list !== '') {
            returnArray = list.split(',');
        }

        return returnArray;
    }

    /* Transforma um Array em uma Lista separada por ","  */
    static ArrayToListCharacter(array: Array<string>): string {
        let list = '';

        if (array && array.length > 0) {
            list = array.join(',');
        }

        return list;
    }

    static isEmpty(object: object): boolean {
        let isEmpty = true;

        for (const content in object) {
            if (object.hasOwnProperty(content)) {
                isEmpty = false;
            }
        }

        return isEmpty;
    }

    static getChartValues(chartData: Array<ChartSeries>): ChartValues {

        let chartValues: ChartValues;

        let maxValue,
            minValue;

        maxValue = undefined;
        minValue = undefined;

        chartData.map(item => {
            if (maxValue === undefined && minValue === undefined) {
                maxValue = item.data[0];
                minValue = item.data[0];
            } else {
                if (item.data < minValue) {
                    minValue = item.data[0];
                }
                if (item.data > maxValue) {
                    maxValue = item.data[0];
                }
            }
        });

        if (maxValue > 0 && minValue > 0) {
            chartValues = { maxValue: maxValue, minValue: 0 };
        }

        if (maxValue > 0 && minValue < 0) {
            chartValues = { maxValue: maxValue, minValue: minValue };
        }

        if (maxValue < 0 && minValue < 0) {
            const max = (minValue / 3) * (- 1);
            chartValues = { maxValue: max, minValue: minValue };
        }

        if (maxValue > 0 && minValue === 0) {
            chartValues = { maxValue: maxValue, minValue: 0 };
        }

        if (maxValue === 0 && minValue < 0) {
            const max = (minValue / 3) * (- 1);
            chartValues = { maxValue: max, minValue: minValue };
        }

        if (maxValue === 0 && minValue === 0) {
            chartValues = { maxValue: undefined, minValue: undefined };
        }

        chartValues.maxValue = Math.round(chartValues.maxValue);
        chartValues.minValue = Math.round(chartValues.minValue);

        return chartValues;
    }

    /*Deixa no list apenas o itens que existem no options*/
    static atzMultiSelectListByOptions(options: Array<PoMultiselectOption>, list: Array<string>): Array<string> {
        let idx: number;
        let newList: Array<string>;

        if (!list) {
            return list;
        }

        newList = new Array<string>();

        list.map(item => {
            if (item) {
                idx = options.findIndex(itemOptions => itemOptions.value === item);
                if (idx >= 0) {
                    newList.push(item);
                }
            }
        });

        return newList;
    }

    /*Carrega o Options com os valores defaults passados como parâmetro (list)*/
    public loadOptionsMultiSelect(options: Array<PoMultiselectOption>, list: Array<string>): void {
        let idx: number;

        if (!list) {
            return;
        }

        list.map(item => {
            if (item) {
                idx = options.findIndex(itemOptions => itemOptions.value === item);
                if (idx === -1) {
                    options.push({ label: item === 'all' ? this.literals['all'] : item, value: item });
                }
            }
        });
    }

    /*Carrega o Options com os valores defaults passados como parâmetro (list)*/
    public loadOptionsSelect(options: Array<PoSelectOption>, selectValue: string, tradValue = false): void {
        let idx: number;

        if (!selectValue) {
            return;
        }

        if (selectValue) {
            idx = options.findIndex(itemOptions => itemOptions.value === selectValue);
            if (idx === -1) {
                options.push({ label: tradValue ? this.literals[selectValue] : selectValue, value: selectValue });
            }
        }
    }

    /*Método que compara 2 objetos e retorna se são iguais ou diferentes*/
    public compareObjects(firstObject: Object, secondObject: Object): boolean {

        if (!firstObject || !secondObject) {
            return false;
        }

        /*Pega a lista de nomes dos campos do objetos e compara*/
        if (Object.getOwnPropertyNames(firstObject).length !== Object.getOwnPropertyNames(secondObject).length) {
            return false;
        }

        for (const content in firstObject) {
            if (content.substr(0, 1) === '$' || content.substr(0, 1) === '_') {
                continue;
            }

            if (firstObject[content] !== secondObject[content]) {
                return false;
            }

        }

        return true;
    }

    public referenceGeneration(charInd: string, dateRef: Date): string {
        let reference: string;
        let random: string;

        const iDay = dateRef.getDate();
        const iMonth = dateRef.getMonth() + 1;
        const iYear = dateRef.getFullYear();

        reference = `${this.pad(iYear)}${this.pad(iMonth)}${this.pad(iDay)}${charInd}`;

        random = btoa(`${(new Date()).getTime()}`);
        random = random.replace(/[=]/g, '');
        random = random.slice(random.length - 3, random.length);

        return `${reference}${random}`;
    }

    public pad(number): string {
        if (number < 10) {
            return '0' + number;
        }
        if (number > 99) {
            return (number + '').slice(2, 4);
        }
        return number;
    }
}
