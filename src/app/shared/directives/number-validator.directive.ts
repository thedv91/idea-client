import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from "@angular/forms";
import { Validate } from "app/utils/validate";

@Directive({
    selector: '[appNumberValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberValidatorDirective), multi: true }
    ]
})
export class NumberValidatorDirective implements Validator {

    constructor() { }

    validate(c: AbstractControl): { [key: string]: any } {

        // value not equal
        if (!Validate.isNumber(c.value)) {
            return {
                appNumberValidator: true
            }
        }

        return null;
    }

}
