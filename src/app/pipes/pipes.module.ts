import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from './number-format.pipe';
import { MyCurrencyPipe } from './my-currency.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NumberFormatPipe, MyCurrencyPipe],
    exports: [NumberFormatPipe, MyCurrencyPipe]
})
export class PipesModule { }
