import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FileItem, ParsedResponseHeaders } from "ng2-file-upload";

import { environment } from "environments/environment";
import { PageUpload } from "app/services/page-upload";
import { RepositoryService } from "app/services/repository.service";
import { LocalDataSource } from "ng2-smart-table";
import { ProductService } from "app/services/product.service";

const URL: string = environment.host + '/api/v1/upload';

interface UploadImageResponse {
    url: string
}

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

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

    code: string;

    // List product by reoisitory
    settings = {
        columns: {
            name: {
                title: 'Tên sản phẩm'
            },
            code: {
                title: 'Mã sản phẩm'
            },
            price: {
                title: 'Giá'
            },
            total: {
                title: 'Số lượng'
            }
        },
        actions: {
            columnTitle: 'Hành động',
            position: 'right',
            add: false,
            edit: false
        },
        edit: {
            editButtonContent: 'Sửa',
            saveButtonContent: 'Lưu',
            cancelButtonContent: 'Hủy'
        },
        add: {
            confirmCreate: true,
            addButtonContent: 'Thêm mới',
            cancelButtonContent: 'Hủy',
            createButtonContent: 'Tạo'
        },
        delete: {
            deleteButtonContent: 'Xóa',
            confirmDelete: true,
        }
    };
    rows = [];

    source: LocalDataSource;


    constructor(
        private repositoryService: RepositoryService,
        private productService: ProductService,
        formBuilder: FormBuilder,
        private route: ActivatedRoute,
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

        this.source = new LocalDataSource();

        this.route.params.subscribe(params => {
            this.code = params['code'];
            this.repositoryService.getRecord(params['code']).subscribe(results => {
                this.source.load(results);
            }, err => {
                this.router.navigate(['/admin/repositories']);
            });
        });
    }

    onFormSubmit() {
        this.isFetching = true;
        this.repositoryService.addProduct(this.code, this.formProduct.value).subscribe(response => {
            this.isFetching = false;
            this.source.prepend(response);
            // this.router.navigate(['/admin/repositories']);
        }, error => {
            this.isFetching = false;
            this.validate = error.validate || {};
        });
    }

    onDeleteConfirm(event) {
        this.productService.remove(event.data).subscribe(res => {
            event.confirm.resolve();
        }, err => {
            event.confirm.reject();
        });
    }

    onFileChange(evt: any) {

        console.log(evt);
    }
}
