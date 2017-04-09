import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from "app/shared/guard/auth.guard";
import { ProductListComponent } from "app/modules/admin/product/product-list.component";
import { DetailComponent } from "app/modules/admin/product/detail/detail.component";
import { FormComponent } from "app/modules/admin/product/form/form.component";
import { LayoutComponent } from "app/modules/admin/product/layout/layout.component";

const routes: Routes = [{
    path: 'product',
    component: LayoutComponent,
    children: [{
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }, {
        path: 'list',
        component: ProductListComponent
    }, {
        path: 'create',
        component: FormComponent
    }, {
        path: ':code',
        component: DetailComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }

export const ProductRouting = routes;
