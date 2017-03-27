import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { ProductService } from "app/services/product.service";

@Component({
    selector: 'app-product-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    formProduct: FormGroup;

    isFetching: boolean = false;

    constructor(
        private productService: ProductService,
        formBuilder: FormBuilder) {
        this.formProduct = formBuilder.group({
            name: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
            code: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
            description: new FormControl('')
        });
    }

    ngOnInit() {

    }

    onFormSubmit() {
        this.isFetching = true;
        this.productService.create(this.formProduct.value).subscribe(response => {
            this.isFetching = false;
        }, error => {
            this.isFetching = false;
        });
    }

}
