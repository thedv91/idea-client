import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from "app/product/product-list.component";
import { AuthGuard } from "app/shared/guard/auth.guard";
import { FormComponent } from "app/product/form/form.component";

const routes: Routes = [{
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard]
}, {
    path: 'product',
    canActivate: [AuthGuard],
    children: [{
        path: 'create',
        component: FormComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
