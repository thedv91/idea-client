import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MediaComponent } from './media/media.component';
import { UsersComponent } from './users/users.component';
import { ProductModule } from "app/modules/admin/product/product.module";
import { RepositoryModule } from "app/modules/admin/repository/repository.module";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ProductModule.forRoot(),
        RepositoryModule.forRoot()
    ],
    declarations: [LayoutComponent, MediaComponent, UsersComponent]
})
export class AdminModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AdminModule
        }
    }
}
