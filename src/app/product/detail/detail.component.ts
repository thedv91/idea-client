import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ProductService } from "app/services/product.service";
import { AnonymousSubscription } from "rxjs/Subscription";

@Component({
    selector: 'app-product-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

    private sub: AnonymousSubscription;
    code: string;
    product: Object | any;
    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {

    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.code = params['code'];
            this.productService.getRecord(params['code']).subscribe(res => {
                this.product = res;
            }, err => {
                this.router.navigate(['/']);
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBack(): void {
        this.location.back();
    }
}
