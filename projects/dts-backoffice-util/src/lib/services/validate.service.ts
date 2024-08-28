import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation } from '@po-ui/ng-components';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ValidateService {
    constructor(private http: HttpClient) { }

    async validate(url: string, value: PoDynamicFormFieldChanged) {
        return await lastValueFrom(this.http.post<PoDynamicFormValidation>(url, value));
    }

    updateFormFields(validation: PoDynamicFormValidation, fields: Array<PoDynamicFormField>) {
        let changedField: any;

        if(validation?.fields){
            validation.fields.forEach(validField => {
                changedField = fields.find(field => field.property === validField.property);
                if(changedField){
                    Object.keys(validField).forEach(function(key) {
                        if (key !== 'property'){
                            changedField[key] = validField[key]
                        }
                    });
                }
            });
        }
        return fields;
    }

    updateFormValue(validation: PoDynamicFormValidation, value: any): any{
        if(validation?.value){
            Object.keys(validation.value).forEach(function(key) {
                value[key] = validation.value[key]
            });
        }
        return value;
    }   
}
