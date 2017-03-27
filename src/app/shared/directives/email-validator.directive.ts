import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from "@angular/forms";

import { Validate } from "app/utils/validate";

@Directive({
    selector: '[appEmailValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true }
    ]
})

export class EmailValidatorDirective implements Validator {

    constructor() { }

    validate(c: AbstractControl): { [key: string]: any } {

        // value not equal
        if (!Validate.isEmail(c.value)) {
            return {
                appEmailValidator: true
            }
        }

        return null;
    }
}
