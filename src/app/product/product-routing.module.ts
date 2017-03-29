import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from "app/product/product-list.component";
import { DetailComponent } from "app/product/detail/detail.component";

const routes: Routes = [{
    path: 'products',
    component: ProductListComponent,
}, {
    path: 'product',
    children: [{
        path: ':code',
        component: DetailComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
