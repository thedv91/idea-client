import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from "app/shared/shared.module";
import { LoginGuard } from "app/shared/guard/login.guard";
import { AuthService } from "app/auth/auth.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [AuthService, LoginGuard]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [AuthService]
        }
    }
}
