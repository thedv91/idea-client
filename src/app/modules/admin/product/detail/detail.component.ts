import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { FileItem, ParsedResponseHeaders } from "ng2-file-upload";
import { AnonymousSubscription } from "rxjs/Subscription";
import _ from 'lodash';

import { ProductService } from "app/services/product.service";
import { PageUpload } from "app/services/page-upload";
import { environment } from "environments/environment";
import { RepositoryService } from "app/services/repository.service";


const URL: string = environment.host + '/api/v1/upload';

interface UploadImageResponse {
    url: string
}

@Component({
    selector: 'app-admin-product-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

    private sub: AnonymousSubscription;
    code: string;
    product: Object | any = {
        name: ''
    };

    repositories = [];

    baseUrl = environment.host;
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
        private repoService: RepositoryService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder,
    ) {

        this.formProduct = this.formBuilder.group({
            image: new FormControl(''),
            name: new FormControl('', Validators.compose([Validators.minLength(2), Validators.required])),
            code: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(3), Validators.required])),
            description: new FormControl(''),
            price: new FormControl(''),
            total: new FormControl(''),
            repositoryId: new FormControl(''),
        });

        this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            const json = JSON.parse(response) as UploadImageResponse;
            this.formProduct.controls['image'].setValue(json.url);
        }

    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.code = params['code'];
            this.productService.getRecord(params['code']).subscribe(res => {
                this.product = res;
                let data = _.pick(res, ['name', 'code', 'image', 'description', 'price', 'total', 'repositoryId']);
                if (_.isObject(data.repositoryId)) {
                    data.repositoryId = data.repositoryId._id;
                }
                this.formProduct.setValue(data);

            }, err => {
                this.router.navigate(['/']);
            });
        });

        this.repoService.getList().subscribe(res => {
            this.repositories = res;
        }, err => {
            this.router.navigate(['/']);
        });
    }

    onFormSubmit() {
        this.isFetching = true;
        this.productService.update(this.product.code, this.formProduct.value).subscribe(response => {
            this.isFetching = false;
            this.router.navigate(['/admin/product']);
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBack(): void {
        this.location.back();
    }
}
