import { Directive, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[appMinValueValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MinValueValidatorDirective), multi: true }
    ]
})
export class MinValueValidatorDirective implements Validator, OnInit {

    @Input('appMinValueValidator') appMinValueValidator: number | any;
    constructor() { }

    ngOnInit() {

    }

    validate(c: AbstractControl): { [key: string]: any } {

        // self value
        let v = c.value;

        if (parseFloat(c.value) < this.appMinValueValidator) {
            return {
                appMinValueValidator: true
            }
        }


        return null;
    }

}
