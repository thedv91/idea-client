import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { HomeComponent } from './page/home/home.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { SidebarComponent } from "app/common/sidebar/sidebar.component";
import { AuthGuard } from "app/shared/guard/auth.guard";
import { AboutComponent } from "app/page/about/about.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        component: AboutComponent
    },
    { path: 'component-aux', component: SidebarComponent, outlet: 'sidebar' }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            useHash: false
        })
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule {

}
