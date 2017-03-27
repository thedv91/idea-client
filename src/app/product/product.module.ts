import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list.component';
import { FormComponent } from './form/form.component';


@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ProductListComponent, FormComponent]
})
export class ProductModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProductModule
        }
    }
}
