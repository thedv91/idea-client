import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from "app/shared/guard/auth.guard";
import { RoleGuard } from "app/shared/guard/role.guard";
import { LoginGuard } from "app/shared/guard/login.guard";
import { PipesModule } from "app/pipes/pipes.module";

import { HighlightDirective } from './directives/highlight.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { NumberValidatorDirective } from './directives/number-validator.directive';
import { IntegerValidatorDirective } from './directives/integer-validator.directive';
import { MinValueValidatorDirective } from './directives/min-value-validator.directive';
import { MaxValueValidatorDirective } from './directives/max-value-validator.directive';
import { MyCurrencyFormatterDirective } from './directives/my-currency-formatter.directive';
import { InputUppercaseDirective } from './directives/input-uppercase.directive';


@NgModule({
    imports: [
        CommonModule,
        PipesModule
    ],
    declarations: [
        HighlightDirective,
        EqualValidatorDirective,
        EmailValidatorDirective,
        NumberValidatorDirective,
        IntegerValidatorDirective,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        MyCurrencyFormatterDirective,
        InputUppercaseDirective],
    exports: [
        HighlightDirective,
        EqualValidatorDirective,
        EmailValidatorDirective,
        NumberValidatorDirective,
        IntegerValidatorDirective,
        MinValueValidatorDirective,
        MaxValueValidatorDirective,
        MyCurrencyFormatterDirective,
        InputUppercaseDirective],
    providers: [
        AuthGuard,
        RoleGuard,
        LoginGuard,
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthGuard,
                RoleGuard,
                LoginGuard,
            ]
        }
    }
}
