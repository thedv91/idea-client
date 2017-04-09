import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from "app/services/http.service";
import { ProductService } from "app/services/product.service";
import { RepositoryService } from "app/services/repository.service";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [HttpService, ProductService, RepositoryService]
})

export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                HttpService,
                ProductService,
                RepositoryService
            ]
        }
    }
}
