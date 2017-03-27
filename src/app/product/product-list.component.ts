import { Component, OnInit } from '@angular/core';

import { ProductService } from "app/services/product.service";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products = null;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getList().subscribe(response => {
            this.products = response;
        })
    }

}
