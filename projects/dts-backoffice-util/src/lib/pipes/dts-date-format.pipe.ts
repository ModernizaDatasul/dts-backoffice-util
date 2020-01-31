import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dtsDateFormat'
})

export class DtsDateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy'): any {
    const { 0: year, 1: month, 2: day } = value.split('-');

    const formattedDate = format.replace('dd', day)
                                .replace('MM', month)
                                .replace('yyyy', year);

    return formattedDate;
  }

}
