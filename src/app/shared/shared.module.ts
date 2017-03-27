import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { AuthGuard } from "app/shared/guard/auth.guard";
import { RoleGuard } from "app/shared/guard/role.guard";
import { LoginGuard } from "app/shared/guard/login.guard";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [HighlightDirective, EqualValidatorDirective, EmailValidatorDirective],
    exports: [HighlightDirective, EqualValidatorDirective, EmailValidatorDirective],
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
