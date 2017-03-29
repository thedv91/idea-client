import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare const QRious: any;

@Directive({
    selector: '[appQrCode]'
})
export class QrCodeDirective implements OnInit {

    @Input('appQrCode') code: string | any;
    @Input('level') level: string | any = 'H';
    @Input('size') size: number | any = 100;

    constructor(private el: ElementRef) {


    }

    ngOnInit() {

        const qr = new QRious({
            element: this.el,
            value: this.code,
            level: this.level,
            size: this.size
        });
        this.el.nativeElement.appendChild(qr.image)
    }

}
