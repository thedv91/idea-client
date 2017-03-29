import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AnonymousSubscription } from "rxjs/Subscription";
import { DatatableComponent } from "@swimlane/ngx-datatable";

import { ProductService } from "app/services/product.service";
import { environment } from "environments/environment";




@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    baseUrl: string = environment.devHost;

    rows = [];
    temp = [];
    selected = [];
    count: number = 0;
    offset: number = 0;
    limit: number = 10;
    products: any;
    form: FormGroup;
    isFetching = false;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('nameTmpl') nameTmpl: TemplateRef<any>;
    @ViewChild('imageTmpl') imageTmpl: TemplateRef<any>;
    columns = [];
    private filter = {
        limit: 10,
        page: 1
    };

    private sub: AnonymousSubscription;

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
        public productService: ProductService,
        formBuilder: FormBuilder,
        private route: ActivatedRoute) {

        if (environment.production) {
            this.baseUrl = environment.prodHost;
        }
    }

    ngOnInit() {

        this.columns = [{
            prop: 'image',
            name: 'Ảnh',
            cellTemplate: this.imageTmpl,
        }, {
            prop: 'name',
            name: 'Tên sản phẩm',
            cellTemplate: this.nameTmpl,
        }, {
            prop: 'code',
            name: 'Mã sản phẩm'
        }, {
            prop: 'price',
            cellTemplate: this.editTmpl,
            name: 'Giá sản phẩm'
        }, {
            prop: 'total',
            name: 'Số lượng'
        }];

        this.page(this.offset, this.limit);

    }

    page(offset, limit) {
        this.productService.getList().subscribe((results) => {
            this.count = results.length;

            const start = offset * limit;
            const end = start + limit;
            const rows = [...this.rows];
            this.temp = [...results];

            for (let i = start; i < end; i++) {
                rows[i] = results[i];
            }

            this.rows = rows;
        });
    }

    onPage(event) {
        this.page(event.offset, event.limit);
    }

    updateFilter(event) {
        const val = event.target.value;

        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || d.code.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
    }

    onSelect({ selected }) {

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {

    }

    onDeleteRow() {
        this.isFetching = true;
        this.productService.remove(this.selected).subscribe(response => {
            this.isFetching = false;
            this.selected = [];
            this.page(this.offset, this.limit);
        }, error => {
            this.isFetching = false;
        });
    }


}
