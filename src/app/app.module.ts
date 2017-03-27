import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from "app/shared/shared.module";
import { AuthModule } from "app/auth/auth.module";
import { ServicesModule } from "app/services/services.module";
import { ProductModule } from "app/product/product.module";

import { AppRoutingModule } from "app/app-routing.module";

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from "app/error/page-not-found/page-not-found.component";
import { HomeComponent } from "app/page/home/home.component";
import { HomeLayoutComponent } from "app/layout/home-layout/home-layout.component";
import { PageNavComponent } from "app/common/page-nav/page-nav.component";
import { SidebarComponent } from "app/common/sidebar/sidebar.component";
import { AuthService } from "app/auth/auth.service";
import { AboutComponent } from './page/about/about.component';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HomeComponent,
        HomeLayoutComponent,
        PageNavComponent,
        SidebarComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule.forRoot(),
        AuthModule.forRoot(),
        ServicesModule.forRoot(),
        ProductModule.forRoot()
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
