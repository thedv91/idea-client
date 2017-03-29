import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ProductService } from "app/services/product.service";
import { FileUploader, FileItem, ParsedResponseHeaders } from "ng2-file-upload";
import { PageUpload } from "app/services/page-upload";
import { environment } from "environments/environment";

let URL: string = environment.devHost + '/upload';
if (environment.production) {
    URL = environment.prodHost + '/upload';
}


interface UploadImageResponse {
    url: string
}

@Component({
    selector: 'app-product-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {

    uploader: PageUpload = new PageUpload({
        url: URL,
        autoUpload: true,
        itemAlias: 'image'
    });

    formProduct: FormGroup;

    isFetching: boolean = false;

    validate = {
        total: null,
        price: null,
        code: null,
    };

    constructor(
        private productService: ProductService,
        formBuilder: FormBuilder,
        private router: Router) {
        this.formProduct = formBuilder.group({
            image: new FormControl(''),
            name: new FormControl('', Validators.compose([Validators.minLength(2), Validators.required])),
            code: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(3), Validators.required])),
            description: new FormControl(''),
            price: new FormControl(''),
            total: new FormControl(''),
        });

        this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            const json = JSON.parse(response) as UploadImageResponse;
            this.formProduct.controls['image'].setValue(json.url);
        }

    }

    ngOnInit() {

    }

    onFormSubmit() {
        this.isFetching = true;
        this.productService.create(this.formProduct.value).subscribe(response => {
            this.isFetching = false;
            this.router.navigate(['/products']);
        }, error => {
            this.isFetching = false;
            this.validate = error.validate || {};
        });
    }

    upload() {

    }
    onFileChange(evt: any) {

        console.log(evt);
    }

}
