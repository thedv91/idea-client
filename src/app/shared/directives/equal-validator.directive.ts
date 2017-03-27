import { Directive, Input, ElementRef, Attribute, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[appEqualValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
    ]
})
export class EqualValidatorDirective implements Validator, OnInit {

    @Input('appEqualValidator') appEqualValidator: string | any;

    @Input('reverse') reverse: string | any;

    constructor(private el: ElementRef) {

    }

    ngOnInit() {

    }

    private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {

        // self value
        let v = c.value;

        // control vlaue
        let e = c.root.get(this.appEqualValidator);

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                appEqualValidator: true
            }
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['appEqualValidator'];
            if (!Object.keys(e.errors).length) e.setErrors(null);
        }

        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ appEqualValidator: true });
        }

        return null;
    }

}
