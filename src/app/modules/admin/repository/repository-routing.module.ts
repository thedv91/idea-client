import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoryListComponent } from "app/modules/admin/repository/repository-list/repository-list.component";
import { DetailComponent } from "app/modules/admin/repository/detail/detail.component";
import { LayoutComponent } from "app/modules/admin/repository/layout/layout.component";

const routes: Routes = [{
    path: 'repository',
    component: LayoutComponent,
    children: [{
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }, {
        path: 'list',
        component: RepositoryListComponent
    }, {
        path: ':code',
        component: DetailComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RepositoryRoutingModule { }


export const RepositoryRouting = routes;