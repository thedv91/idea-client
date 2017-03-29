import { Directive, OnInit, ElementRef, HostListener } from '@angular/core';
import { MyCurrencyPipe } from "app/pipes/my-currency.pipe";

@Directive({
    selector: '[appMyCurrencyFormatter]'
})
export class MyCurrencyFormatterDirective implements OnInit {

    private el: HTMLInputElement;
    constructor(
        private elementRef: ElementRef,
        private currencyPipe: MyCurrencyPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.currencyPipe.transform(this.el.value);
    }


    @HostListener('focus', ["$event.target.value"])
    onFocus(value) {
        this.el.value = this.currencyPipe.parse(value); // opossite of transform
    }

    @HostListener('blur', ["$event.target.value"])
    onBlur(value) {
        this.el.value = this.currencyPipe.transform(value);
    }

}
