import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { PaginationControlComponent } from './pagination-control/pagination-control.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [PaginationControlComponent],
    exports: [PaginationControlComponent]
})

export class ComponentsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ComponentsModule,
            providers: []
        }
    }
}
