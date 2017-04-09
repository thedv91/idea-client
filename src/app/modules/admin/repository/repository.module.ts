import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FileUploadModule } from "ng2-file-upload";
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryListComponent, CustomRenderComponent } from './repository-list/repository-list.component';
import { SharedModule } from "app/shared/shared.module";
import { PipesModule } from "app/pipes/pipes.module";
import { DetailComponent } from './detail/detail.component';
import { LayoutComponent } from './layout/layout.component';




@NgModule({
    imports: [
        CommonModule,
        RepositoryRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        PipesModule,
        SharedModule.forRoot(),
        Ng2SmartTableModule
    ],
    entryComponents: [CustomRenderComponent],
    declarations: [RepositoryListComponent, DetailComponent, CustomRenderComponent, LayoutComponent]
})
export class RepositoryModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RepositoryModule
        }
    }
}
