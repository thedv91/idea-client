import { Directive, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";

@Directive({
    selector: '[appInputUppercase]'
})
export class InputUppercaseDirective {

    private el: HTMLInputElement;

    constructor(private elementRef: ElementRef) {
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('keypress', ["$event.target.value"])
    handleKeypress(value: any) {
        this.el.value = value.toUpperCase();
    }

    @HostListener('keydown', ["$event.target.value"])
    handleKeydown(value: any) {
        this.el.value = value.toUpperCase();
    }

    @HostListener('blur', ["$event.target.value"])
    handleBlur(value: any) {
        this.el.value = value.toUpperCase();
    }

    @HostListener('keyup', ["$event.target.value"])
    handleKeyup(value: any) {
        this.el.value = value.toUpperCase();
    }
}
