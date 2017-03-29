import { Directive, forwardRef, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

import { Validate } from "app/utils/validate";

@Directive({
    selector: '[appIntegerValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => IntegerValidatorDirective), multi: true }
    ]
})
export class IntegerValidatorDirective implements Validator {

    constructor(private el: ElementRef) { }

    validate(c: AbstractControl): { [key: string]: any } {

        // value not equal
        if (!Validate.isInteger(c.value)) {
            return {
                appIntegerValidator: true
            }
        }

        return null;
    }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;

        if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
}
